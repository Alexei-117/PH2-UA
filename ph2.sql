-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 10-03-2017 a las 12:13:24
-- Versión del servidor: 10.1.13-MariaDB
-- Versión de PHP: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ph2`
--
CREATE DATABASE IF NOT EXISTS `ph2` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ph2`;

--
-- Creación y asignación de permisos para el usuario 'ph2' con password 'ph2'
--
GRANT ALL PRIVILEGES ON ph2.* to 'ph2'@'%' identified by 'ph2';
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

DROP TABLE IF EXISTS `comentario`;
CREATE TABLE `comentario` (
  `id` int(11) NOT NULL,
  `id_entrada` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `texto` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comentario`
--

INSERT INTO `comentario` (`id`, `id_entrada`, `login`, `titulo`, `texto`, `fecha`) VALUES
(1, 1, 'usu2', 'Más razón que un santo', 'Tienes toda la razón. Yo he dejado de pasar por la calle para no estropear el coche.', '2017-02-17 09:35:59'),
(2, 1, 'usu5', 'Van a arreglarlos', 'Me han comentado que van a asfaltarlo antes de que acabe el mes.', '2017-02-17 09:42:52'),
(3, 1, 'usu3', 'Asfaltarlo??!!!', 'Pero te han dicho de qué mes???, porque eso ya lo escuché yo hace un año.', '2017-02-17 09:42:52'),
(7, 2, 'usu1', 'Más bancos', 'Sí, no está mal, pero también podían haber puesto más bancos. Como llegues un poco tarde por las tardes, no pillas sitio para sentarte.', '2017-02-17 09:45:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada`
--

DROP TABLE IF EXISTS `entrada`;
CREATE TABLE `entrada` (
  `id` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `entrada`
--

INSERT INTO `entrada` (`id`, `login`, `nombre`, `descripcion`, `fecha`) VALUES
(1, 'usu1', 'Baches en la calle principal', 'Mi queja es para denunciar el estado de la calle principal, hay más baches que asfalto. El ayuntamiento debería hacer algo. No es normal que cada vez haya más baches, algunos de ellos son auténticos socavones. Pongo algunas fotos de los baches para que os hagáis una idea.', '2017-02-17 09:34:53'),
(2, 'usu2', 'Plaza mayor tras las obras', 'Hola a todos.\r\n\r\nTras las obras realizadas a la plaza mayor de nuestro pueblo, he de reconocer que ha quedado muy bien. Ahora ya no hay tierra y cuando llueve no tenemos que andar esquivando los charcos de barro, ahora los charcos son sólo de agua.\r\n\r\nPuede ser que no todos lo veáis igual, pero creo que se nota la mejora aunque, lógicamente, se podría haber hecho mejor.\r\n\r\nOs dejo unas fotos que he hecho, por si hay alguien que todavía no ha visto los cambios.', '2017-02-17 09:34:53'),
(26, 'usu4', 'Nuevo Nokia 3310', 'Acabo de probar el nuevo Nokia 3310. No sé si os acordaréis del modelo antiguo (abajo os dejo fotos), pero no se diferencia mucho del nuevo. Lógicamente ha sufrido un evolución, pero han intentado que se parezca bastante.<br>\r\nTiene una conectividad 2.5G y aunque no es un smartphone sí que proporciona algunas utilidades de internet.<br>\r\nTiene una pantalla de color y su punto fuerte es la batería, ya que puede estar hasta un mes en standby y permite más de 22 horas de conversación.<br>\r\nPor cierto, trae el famoso juego de la serpiente presinstalado y en versión moderna.<br>\r\nEl precio con el que se lanza es de 49€.', '2017-03-08 08:42:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foto`
--

DROP TABLE IF EXISTS `foto`;
CREATE TABLE `foto` (
  `id` int(11) NOT NULL,
  `id_entrada` int(11) NOT NULL,
  `texto` varchar(250) NOT NULL,
  `fichero` varchar(250) NOT NULL COMMENT 'nombre del fichero'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `foto`
--

INSERT INTO `foto` (`id`, `id_entrada`, `texto`, `fichero`) VALUES
(1, 1, 'Como podéis ver en la foto, el primer bache ya es considerable.', '1.jpg'),
(2, 1, 'En la parte del supermercado es increible la cantidad de baches que hay.', '2.jpg'),
(3, 2, 'Como podéis ver, ya no hay tierra!!!', '3.jpg'),
(4, 2, 'Parece que no va a haber mucha sombre en la plaza, pero esperemos a que crezcan los árboles.', '4.jpg'),
(18, 26, 'Aspecto del nuevo Nokia 3310', '18.jpg'),
(19, 26, 'Así era el Nokia 3310', '19.jpg'),
(20, 26, 'Pantalla del nuevo Nokia 3310.', '20.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `login` varchar(20) NOT NULL,
  `pwd` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `clave` varchar(40) DEFAULT NULL,
  `ultimo_acceso` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`login`, `pwd`, `nombre`, `email`, `clave`, `ultimo_acceso`) VALUES
('usu1', 'usu1', 'Usuario 1', 'usu1@ph2.es', '57966fdc45f16bf29e22651240893b76', '2017-03-06 10:52:43'),
('usu2', 'usu2', 'Usuario 2', 'usu2@ph2.es', 'a81a13799f241d915595b6264f3c339b', '2017-02-28 11:11:42'),
('usu3', 'usu3', 'Usuario 3', 'usu3@ph2.es', NULL, '2017-02-17 09:36:38'),
('usu4', 'usu4', 'Usuario 4', 'usu4@ph2.es', '73c04f2eaba0543fe735515c6994f66b', '2017-03-10 11:12:07'),
('usu5', 'usu5', 'Usuario 5', 'usu5@ph2.es', '0b3af3647a13e1c2906498eb7c08d48d', '2017-03-08 09:02:11'),
('usu6', 'usu6', 'Usuario 6', 'usu6@gmail.com', NULL, '2017-03-08 08:49:32');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_articulo` (`id_entrada`),
  ADD KEY `login_usuario` (`login`) USING BTREE;

--
-- Indices de la tabla `entrada`
--
ALTER TABLE `entrada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `login` (`login`);

--
-- Indices de la tabla `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_articulo` (`id_entrada`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`login`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `entrada`
--
ALTER TABLE `entrada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT de la tabla `foto`
--
ALTER TABLE `foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`login`) REFERENCES `usuario` (`login`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comentario_ibfk_2` FOREIGN KEY (`id_entrada`) REFERENCES `entrada` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `entrada`
--
ALTER TABLE `entrada`
  ADD CONSTRAINT `entrada_ibfk_1` FOREIGN KEY (`login`) REFERENCES `usuario` (`login`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `foto`
--
ALTER TABLE `foto`
  ADD CONSTRAINT `foto_ibfk_2` FOREIGN KEY (`id_entrada`) REFERENCES `entrada` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
