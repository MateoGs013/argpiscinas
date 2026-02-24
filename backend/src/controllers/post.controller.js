const prisma = require('../lib/prisma');
const { sanitize } = require('../lib/sanitize');
const { generateSlug, ensureUniqueSlug } = require('../lib/slugify');
const { parseId } = require('../lib/parseId');

// Obtener todos los posts (público - solo publicados)
const getPosts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      tag,
      search 
    } = req.query;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 10));
    const skip = (pageNum - 1) * limitNum;

    const where = {
      status: 'PUBLISHED',
      publishedAt: { lte: new Date() },
    };

    if (category) {
      where.categories = {
        some: { category: { slug: category } },
      };
    }

    if (tag) {
      where.tags = {
        some: { tag: { slug: tag } },
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { publishedAt: 'desc' },
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
        },
      }),
      prisma.post.count({ where }),
    ]);

    const formattedPosts = posts.map(post => ({
      ...post,
      categories: post.categories.map(pc => pc.category),
      tags: post.tags.map(pt => pt.tag),
    }));

    res.json({
      posts: formattedPosts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error al obtener posts:', error);
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
};

// Obtener todos los posts (admin - todos los estados)
const getAdminPosts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10,
      status,
      search 
    } = req.query;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 10));
    const skip = (pageNum - 1) * limitNum;

    const where = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: {
          author: { select: { id: true, name: true } },
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
        },
      }),
      prisma.post.count({ where }),
    ]);

    const formattedPosts = posts.map(post => ({
      ...post,
      categories: post.categories.map(pc => pc.category),
      tags: post.tags.map(pt => pt.tag),
    }));

    res.json({
      posts: formattedPosts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error al obtener posts (admin):', error);
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
};

// Obtener post por slug (público)
const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    if (post.status !== 'PUBLISHED' && !req.user) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json({
      ...post,
      categories: post.categories.map(pc => pc.category),
      tags: post.tags.map(pt => pt.tag),
    });
  } catch (error) {
    console.error('Error al obtener post:', error);
    res.status(500).json({ error: 'Error al obtener el post' });
  }
};

// Obtener post por ID (admin)
const getPostById = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json({
      ...post,
      categories: post.categories.map(pc => pc.category),
      tags: post.tags.map(pt => pt.tag),
    });
  } catch (error) {
    console.error('Error al obtener post:', error);
    res.status(500).json({ error: 'Error al obtener el post' });
  }
};

// Crear post
const createPost = async (req, res) => {
  try {
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      featuredImage,
      status,
      seoTitle,
      seoDescription,
      publishedAt,
      categoryIds,
      tagIds,
    } = req.body;

    const baseSlug = customSlug || generateSlug(title);
    const slug = await ensureUniqueSlug(prisma, 'post', baseSlug);

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content: sanitize(content),
        featuredImage,
        status: status || 'DRAFT',
        seoTitle,
        seoDescription,
        publishedAt: publishedAt ? new Date(publishedAt) : (status === 'PUBLISHED' ? new Date() : null),
        authorId: req.user.id,
        categories: categoryIds?.length > 0 ? {
          create: categoryIds.map(id => ({ categoryId: parseInt(id) })),
        } : undefined,
        tags: tagIds?.length > 0 ? {
          create: tagIds.map(id => ({ tagId: parseInt(id) })),
        } : undefined,
      },
      include: {
        author: { select: { id: true, name: true } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });

    res.status(201).json({
      ...post,
      categories: post.categories.map(pc => pc.category),
      tags: post.tags.map(pt => pt.tag),
    });
  } catch (error) {
    console.error('Error al crear post:', error);
    res.status(500).json({ error: 'Error al crear el post' });
  }
};

// Actualizar post (M3 fix: wrapped in $transaction)
const updatePost = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });

    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      featuredImage,
      status,
      seoTitle,
      seoDescription,
      publishedAt,
      categoryIds,
      tagIds,
    } = req.body;

    const existingPost = await prisma.post.findUnique({ where: { id } });

    if (!existingPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    const updateData = {
      title,
      excerpt,
      content: content !== undefined ? sanitize(content) : undefined,
      featuredImage,
      status,
      seoTitle,
      seoDescription,
    };

    // Actualizar slug si se proporciona uno nuevo
    if (customSlug && customSlug !== existingPost.slug) {
      const slugExists = await prisma.post.findFirst({
        where: { slug: customSlug, id: { not: id } },
      });
      if (slugExists) {
        return res.status(400).json({ error: 'El slug ya está en uso' });
      }
      updateData.slug = customSlug;
    }

    // Manejar fecha de publicación
    if (publishedAt) {
      updateData.publishedAt = new Date(publishedAt);
    } else if (status === 'PUBLISHED' && !existingPost.publishedAt) {
      updateData.publishedAt = new Date();
    }

    // Use transaction to keep relations + post update atomic
    const post = await prisma.$transaction(async (tx) => {
      // Update category relations
      if (categoryIds !== undefined) {
        await tx.postCategory.deleteMany({ where: { postId: id } });
        if (categoryIds.length > 0) {
          await tx.postCategory.createMany({
            data: categoryIds.map(categoryId => ({
              postId: id,
              categoryId: parseInt(categoryId),
            })),
          });
        }
      }

      // Update tag relations
      if (tagIds !== undefined) {
        await tx.postTag.deleteMany({ where: { postId: id } });
        if (tagIds.length > 0) {
          await tx.postTag.createMany({
            data: tagIds.map(tagId => ({
              postId: id,
              tagId: parseInt(tagId),
            })),
          });
        }
      }

      return tx.post.update({
        where: { id },
        data: updateData,
        include: {
          author: { select: { id: true, name: true } },
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
        },
      });
    });

    res.json({
      ...post,
      categories: post.categories.map(pc => pc.category),
      tags: post.tags.map(pt => pt.tag),
    });
  } catch (error) {
    console.error('Error al actualizar post:', error);
    res.status(500).json({ error: 'Error al actualizar el post' });
  }
};

// Eliminar post
const deletePost = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    await prisma.post.delete({ where: { id } });

    res.json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar post:', error);
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
};

// Cambiar estado del post
const updatePostStatus = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });

    const { status } = req.body;

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    const updateData = { status };

    if (status === 'PUBLISHED' && !post.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedPost);
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({ error: 'Error al actualizar el estado del post' });
  }
};

module.exports = {
  getPosts,
  getAdminPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  updatePostStatus,
};
