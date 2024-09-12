'use server';

import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from '../../auth';
import { AuthError } from 'next-auth';

//Editar Perfil
export async function editarPerfil(formData: FormData) {
  const { nombre, apellido, email, telefono } = Object.fromEntries(formData);
  try {
    await sql`
    UPDATE usuarios
    SET nombre = ${nombre.toString()}, apellido = ${apellido.toString()}, telefono = ${telefono.toString()} WHERE email = ${email.toString()}`;
  } catch (error) {
    console.error('Error de base de datos:', error);
    throw { message: 'Error de al actualizar el usuario' };
  }
  revalidatePath('/pages/perfil');
}

//Registrar Usuario
export async function registrarUsuario(formData: FormData) {
  const { nombre, apellido, telefono, password } = Object.fromEntries(formData);
  const hashedPassword = await bcrypt.hash(password.toString(), 10);
  const email = Object.fromEntries(formData).email.toString() || '';

  // Crear la fecha de registro en formato 'YYYY-MM-DD HH:MM:SS'
  const fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    await sql`
      INSERT INTO usuarios (nombre, apellido, telefono, email, password, fecha_registro, rol_id)
      VALUES (${nombre.toString()}, ${apellido.toString()}, ${telefono.toString()}, ${email}, ${hashedPassword}, ${fecha_registro}, 2)
    `;
  } catch (error) {
    console.error('Error de base de datos:', error);
    throw { message: 'Error al registrar usuario' };
  }

  revalidatePath('/registro');
  redirect('/login');
}

//Nuevo alquiler
export async function nuevoAlquiler(formData: FormData) {
  const { nombre, precio } = Object.fromEntries(formData);
  try {
    await sql`
    INSERT INTO tipo_alquiler (nombre,precio)
    VALUES (${nombre.toString()}, ${Number(precio)})`;
  } catch (error) {
    console.error('Error de base de datos:', error);
    throw { message: 'Error al registrar el alquiler' };
  }

  revalidatePath('/pages/configuraciones/tipo-alquiler');
}
//Editar alquiler
export async function editarAlquiler(formData: FormData) {
  const { id, nombre, precio } = Object.fromEntries(formData);
  try {
    await sql`
    UPDATE tipo_alquiler
    SET nombre = ${nombre.toString()}, precio = ${Number(precio)}
    WHERE id = ${Number(id)}`;
  } catch (error) {
    console.error('Error de base de datos:', error);
    throw { message: 'Error al editar el alquiler' };
  }

  revalidatePath('/pages/configuraciones/tipo-alquiler');
}

//Nuevo Servicio
export async function nuevoServicio(formData: FormData) {
  const { nombre, detalle, precio, stock, urlimg } = Object.fromEntries(formData);
  console.log(formData);
  try {
    await sql`
    INSERT INTO servicios (nombre,detalle,precio,stock,urlimg)
    VALUES (${nombre.toString()}, ${detalle.toString()}, ${Number(precio)}, 
    ${Number(stock)}, ${urlimg.toString()})`;
  } catch (error) {
    console.error('Error de base de datos:', error);
    throw { message: 'Error al registrar el Servicio' };
  }
  revalidatePath('/pages/configuraciones/servicios');
}

//Editar Servicio
export async function editarServicio(formData: FormData) {
  const { id, nombre, detalle, precio, stock, urlimg } = Object.fromEntries(formData);
  console.log(formData);
  try {
    await sql`
    UPDATE servicios
    SET nombre = ${nombre.toString()}, detalle = ${detalle.toString()}, precio = ${Number(precio)}, 
    stock = ${Number(stock)}, urlimg = ${urlimg.toString()}
    WHERE id = ${Number(id)}`;
  } catch (error) {
    console.error('Error de base de datos:', error);
    throw { message: 'Error al editar el Servicio' };
  }
  revalidatePath('/pages/configuraciones/servicios');
}

//Iniciar Sesion
export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
