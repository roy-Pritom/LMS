import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';
import { TUser } from './user.interface';
import { UserRole } from '@prisma/client';

// create user and author
const createUser = async (payload: TUser) => {
  // secure password
  const hashPassword = bcrypt.hashSync(payload.password, 12);
  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashPassword,
  };

  const result = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  return result;
};
const createTeacher = async (payload: TUser) => {
  // secure password
  const hashPassword = bcrypt.hashSync(payload.password, 12);
  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashPassword,
    role: UserRole.TEACHER,
  };

  const result = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  return result;
};

const getAllUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};

export const UserServices = {
  createUser,
  createTeacher,
  getAllUser,
};
