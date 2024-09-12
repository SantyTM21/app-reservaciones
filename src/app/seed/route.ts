import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import {
  usuarios,
  tipoAlquiler,
  servicios,
  reservacionesServicios,
  reservaciones,
} from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsuarios() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nombre varchar(50) NOT NULL,
      apellido varchar(50) NOT NULL,
      telefono varchar(10) DEFAULT NULL,
      email varchar(50) NOT NULL UNIQUE,
      password text NOT NULL,
      fecha_registro timestamp NOT NULL,
      rol_id int NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    usuarios.map(async (usuario) => {
      const hashedPassword = await bcrypt.hash(usuario.password, 10);
      return client.sql`
        INSERT INTO usuarios (id, nombre, apellido, telefono, email, password, fecha_registro, rol_id)
        VALUES (${usuario.id}, ${usuario.nombre}, ${usuario.apellido}, ${
        usuario.telefono ? usuario.telefono : null
      }, ${usuario.email}, ${hashedPassword}, ${usuario.fecha_registro}, ${usuario.rol_id})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedReservaciones() {
  await client.sql`
  CREATE TABLE IF NOT EXISTS reservaciones (
    id SERIAL PRIMARY KEY,
    fecha_registro timestamp NOT NULL ,
    fecha_inicio date DEFAULT NULL,
    hora_inicio time DEFAULT NULL,
    fecha_fin date NOT NULL,
    hora_fin time NOT NULL,
    estado varchar(50) NOT NULL,
    total double precision NOT NULL,
    usuario_id int NOT NULL,
    tipo_alquiler_id int NOT NULL
  );
`;

  const insertedReservaciones = await Promise.all(
    reservaciones.map(async (reservacion) => {
      return client.sql`
        INSERT INTO reservaciones (id, fecha_registro, fecha_inicio, hora_inicio, fecha_fin, hora_fin, estado, total, usuario_id, tipo_alquiler_id)
        VALUES (${reservacion.id}, ${reservacion.fecha_registro}, ${reservacion.fecha_inicio}, ${reservacion.hora_inicio}, ${reservacion.fecha_fin}, ${reservacion.hora_fin}, ${reservacion.estado}, ${reservacion.total}, ${reservacion.usuario_id}, ${reservacion.tipo_alquiler_id})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedReservaciones;
}

async function seedReservacionesServicios() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS reservaciones_servicios (
      id SERIAL PRIMARY KEY,
      reservacion_id int NOT NULL,
      servicio_id int NOT NULL,
      cantidad decimal(10,0) NOT NULL
    );
  `;

  const insertedReservacionesServicios = await Promise.all(
    reservacionesServicios.map(async (reservacionServicio) => {
      return client.sql`
        INSERT INTO reservaciones_servicios (id, reservacion_id, servicio_id, cantidad)
        VALUES (${reservacionServicio.id}, ${reservacionServicio.reservacion_id}, ${reservacionServicio.servicio_id}, ${reservacionServicio.cantidad})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedReservacionesServicios;
}

async function seedServicios() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS servicios (
      id SERIAL PRIMARY KEY,
      nombre varchar(50) NOT NULL,
      detalle varchar(100) NOT NULL,
      precio double precision NOT NULL,
      stock int NOT NULL,
      urlimg varchar(200) NOT NULL
    );
  `;

  const insertedServicios = await Promise.all(
    servicios.map(async (servicio) => {
      return client.sql`
        INSERT INTO servicios (id, nombre, detalle, precio, stock, urlimg)
        VALUES (${servicio.id}, ${servicio.nombre}, ${servicio.detalle}, ${servicio.precio}, ${servicio.stock}, ${servicio.urlimg})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedServicios;
}

async function seedTipoAlquiler() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS tipo_alquiler (
      id SERIAL PRIMARY KEY,
      nombre varchar(100) NOT NULL,
      precio double precision NOT NULL
    );
  `;

  const insertedTipoAlquiler = await Promise.all(
    tipoAlquiler.map(async (alquiler) => {
      return client.sql`
        INSERT INTO tipo_alquiler (id, nombre, precio)
        VALUES (${alquiler.id}, ${alquiler.nombre}, ${alquiler.precio})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedTipoAlquiler;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    await seedUsuarios();
    await seedReservaciones();
    await seedReservacionesServicios();
    await seedServicios();
    await seedTipoAlquiler();
    await client.sql`COMMIT`;

    return Response.json({ message: 'DB plantada correctamente' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error: error }, { status: 500 });
  }
}
