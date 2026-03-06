const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Obtener usuario actual
const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error al obtener información del usuario' });
  }
};

// Actualizar perfil
const updateProfile = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    // Si quiere cambiar contraseña
    if (currentPassword && newPassword) {
      if (newPassword.length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({
          error: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`,
        });
      }
      if (!PASSWORD_REGEX.test(newPassword)) {
        return res.status(400).json({
          error: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
      });

      const isValidPassword = await bcrypt.compare(currentPassword, user.password);

      if (!isValidPassword) {
        return res.status(400).json({ error: 'Contraseña actual incorrecta' });
      }

      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    if (error.code === 'P2002' && String(error.meta?.target || '').includes('email')) {
      return res.status(409).json({ error: 'El email ya está en uso por otro usuario' });
    }
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
};

// Registro (solo admin puede crear usuarios)
const register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'EDITOR',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

module.exports = {
  login,
  me,
  updateProfile,
  register,
};
