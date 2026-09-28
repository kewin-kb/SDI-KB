--
-- PostgreSQL database cluster dump
--

-- Started on 2026-09-27 21:33:14

\restrict PoCgpaRyX22aQJkgfgSPJkJ5CgKXcx5wItQ4Zh5HXA19sGP5ocqx75QZUtx079h

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:wj0Qgn0Hj2DLyBFiFDH5gA==$4cL1ba2vUJRatqBT0EHfpwGITdOyV+OqKPP+sgOHMko=:coHuLXNXob/reita/Uld6q9rf7S8YTA8gLZRzgE38p4=';

--
-- User Configurations
--








\unrestrict PoCgpaRyX22aQJkgfgSPJkJ5CgKXcx5wItQ4Zh5HXA19sGP5ocqx75QZUtx079h

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict oe1jPhLmQjEa12XREyfOickBs5nmAIbSjOh7KC9bZddnzAwUKkOVtgld7lLRWW1

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-09-27 21:33:14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2026-09-27 21:33:15

--
-- PostgreSQL database dump complete
--

\unrestrict oe1jPhLmQjEa12XREyfOickBs5nmAIbSjOh7KC9bZddnzAwUKkOVtgld7lLRWW1

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict zxhFdFYewU6ZeJ5e9lDCTWqelftKxNjymQ7ytDgifvqh4ztaqWFpsTyusqXCDLu

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-09-27 21:33:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2026-09-27 21:33:15

--
-- PostgreSQL database dump complete
--

\unrestrict zxhFdFYewU6ZeJ5e9lDCTWqelftKxNjymQ7ytDgifvqh4ztaqWFpsTyusqXCDLu

--
-- Database "sdikb_db" dump
--

--
-- PostgreSQL database dump
--

\restrict uikxF0qbcLW2qLDMblgnGISOnPHgEMg8EGoc4boaVB1JzHYas9A9Tzh57CQ4YuQ

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-09-27 21:33:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5116 (class 1262 OID 16388)
-- Name: sdikb_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE sdikb_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';


ALTER DATABASE sdikb_db OWNER TO postgres;

\unrestrict uikxF0qbcLW2qLDMblgnGISOnPHgEMg8EGoc4boaVB1JzHYas9A9Tzh57CQ4YuQ
\connect sdikb_db
\restrict uikxF0qbcLW2qLDMblgnGISOnPHgEMg8EGoc4boaVB1JzHYas9A9Tzh57CQ4YuQ

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 232 (class 1259 OID 16484)
-- Name: areas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.areas (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.areas OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16483)
-- Name: areas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.areas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.areas_id_seq OWNER TO postgres;

--
-- TOC entry 5117 (class 0 OID 0)
-- Dependencies: 231
-- Name: areas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.areas_id_seq OWNED BY public.areas.id;


--
-- TOC entry 230 (class 1259 OID 16469)
-- Name: colaborador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colaborador (
    id integer NOT NULL,
    nombrecompleto character varying(100) NOT NULL,
    cedula integer NOT NULL,
    fecharegistro date NOT NULL,
    area integer NOT NULL,
    cargo character varying(100) NOT NULL
);


ALTER TABLE public.colaborador OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16468)
-- Name: colaborador_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colaborador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colaborador_id_seq OWNER TO postgres;

--
-- TOC entry 5118 (class 0 OID 0)
-- Dependencies: 229
-- Name: colaborador_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colaborador_id_seq OWNED BY public.colaborador.id;


--
-- TOC entry 226 (class 1259 OID 16433)
-- Name: equipos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipos (
    id integer NOT NULL,
    tipoequipo integer NOT NULL,
    marca character varying(100) NOT NULL,
    hostname character(100) NOT NULL,
    modelo character varying(100) NOT NULL,
    serial character varying(100) NOT NULL,
    procesador character varying(100) NOT NULL,
    ram character varying(100) NOT NULL,
    disco integer NOT NULL,
    tipodisco integer NOT NULL,
    tiposistope integer NOT NULL,
    fechacompra date NOT NULL,
    garantia integer NOT NULL,
    estado integer,
    usuario_id integer,
    fechacreado timestamp with time zone
);


ALTER TABLE public.equipos OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16432)
-- Name: equipos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.equipos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.equipos_id_seq OWNER TO postgres;

--
-- TOC entry 5119 (class 0 OID 0)
-- Dependencies: 225
-- Name: equipos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.equipos_id_seq OWNED BY public.equipos.id;


--
-- TOC entry 228 (class 1259 OID 16460)
-- Name: estadoasignado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estadoasignado (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.estadoasignado OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16459)
-- Name: estadoasignado_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estadoasignado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estadoasignado_id_seq OWNER TO postgres;

--
-- TOC entry 5120 (class 0 OID 0)
-- Dependencies: 227
-- Name: estadoasignado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estadoasignado_id_seq OWNED BY public.estadoasignado.id;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    cantidad integer DEFAULT 0 NOT NULL,
    precio numeric(10,2) NOT NULL,
    creado_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_id_seq OWNER TO postgres;

--
-- TOC entry 5121 (class 0 OID 0)
-- Dependencies: 219
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- TOC entry 236 (class 1259 OID 16503)
-- Name: tipodisco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipodisco (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.tipodisco OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16502)
-- Name: tipodisco_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipodisco_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipodisco_id_seq OWNER TO postgres;

--
-- TOC entry 5122 (class 0 OID 0)
-- Dependencies: 235
-- Name: tipodisco_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipodisco_id_seq OWNED BY public.tipodisco.id;


--
-- TOC entry 234 (class 1259 OID 16494)
-- Name: tipoequipo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipoequipo (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.tipoequipo OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16493)
-- Name: tipoequipo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipoequipo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipoequipo_id_seq OWNER TO postgres;

--
-- TOC entry 5123 (class 0 OID 0)
-- Dependencies: 233
-- Name: tipoequipo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipoequipo_id_seq OWNED BY public.tipoequipo.id;


--
-- TOC entry 238 (class 1259 OID 16512)
-- Name: tiposo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tiposo (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.tiposo OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16511)
-- Name: tiposo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tiposo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tiposo_id_seq OWNER TO postgres;

--
-- TOC entry 5124 (class 0 OID 0)
-- Dependencies: 237
-- Name: tiposo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tiposo_id_seq OWNED BY public.tiposo.id;


--
-- TOC entry 224 (class 1259 OID 16419)
-- Name: tipousuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipousuario (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.tipousuario OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16418)
-- Name: tipousuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipousuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipousuario_id_seq OWNER TO postgres;

--
-- TOC entry 5125 (class 0 OID 0)
-- Dependencies: 223
-- Name: tipousuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipousuario_id_seq OWNED BY public.tipousuario.id;


--
-- TOC entry 222 (class 1259 OID 16403)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    usuario character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    creado_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    rol_id integer
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16402)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 5126 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4910 (class 2604 OID 16487)
-- Name: areas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.areas ALTER COLUMN id SET DEFAULT nextval('public.areas_id_seq'::regclass);


--
-- TOC entry 4909 (class 2604 OID 16472)
-- Name: colaborador id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborador ALTER COLUMN id SET DEFAULT nextval('public.colaborador_id_seq'::regclass);


--
-- TOC entry 4907 (class 2604 OID 16436)
-- Name: equipos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos ALTER COLUMN id SET DEFAULT nextval('public.equipos_id_seq'::regclass);


--
-- TOC entry 4908 (class 2604 OID 16463)
-- Name: estadoasignado id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadoasignado ALTER COLUMN id SET DEFAULT nextval('public.estadoasignado_id_seq'::regclass);


--
-- TOC entry 4901 (class 2604 OID 16393)
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- TOC entry 4912 (class 2604 OID 16506)
-- Name: tipodisco id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipodisco ALTER COLUMN id SET DEFAULT nextval('public.tipodisco_id_seq'::regclass);


--
-- TOC entry 4911 (class 2604 OID 16497)
-- Name: tipoequipo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipoequipo ALTER COLUMN id SET DEFAULT nextval('public.tipoequipo_id_seq'::regclass);


--
-- TOC entry 4913 (class 2604 OID 16515)
-- Name: tiposo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tiposo ALTER COLUMN id SET DEFAULT nextval('public.tiposo_id_seq'::regclass);


--
-- TOC entry 4906 (class 2604 OID 16422)
-- Name: tipousuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipousuario ALTER COLUMN id SET DEFAULT nextval('public.tipousuario_id_seq'::regclass);


--
-- TOC entry 4904 (class 2604 OID 16406)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 5104 (class 0 OID 16484)
-- Dependencies: 232
-- Data for Name: areas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.areas (id, nombre) FROM stdin;
1	Sistemas
2	Talento humano
3	Armenia
4	Villavivencio
5	Barranquilla
\.


--
-- TOC entry 5102 (class 0 OID 16469)
-- Dependencies: 230
-- Data for Name: colaborador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colaborador (id, nombrecompleto, cedula, fecharegistro, area, cargo) FROM stdin;
\.


--
-- TOC entry 5098 (class 0 OID 16433)
-- Dependencies: 226
-- Data for Name: equipos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipos (id, tipoequipo, marca, hostname, modelo, serial, procesador, ram, disco, tipodisco, tiposistope, fechacompra, garantia, estado, usuario_id, fechacreado) FROM stdin;
\.


--
-- TOC entry 5100 (class 0 OID 16460)
-- Dependencies: 228
-- Data for Name: estadoasignado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estadoasignado (id, nombre) FROM stdin;
\.


--
-- TOC entry 5092 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id, nombre, cantidad, precio, creado_en) FROM stdin;
1	COMPUTADOR	20	512021.00	2026-09-25 22:34:26.626866
\.


--
-- TOC entry 5108 (class 0 OID 16503)
-- Dependencies: 236
-- Data for Name: tipodisco; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipodisco (id, nombre) FROM stdin;
1	HDD
2	SSD
3	M.2
\.


--
-- TOC entry 5106 (class 0 OID 16494)
-- Dependencies: 234
-- Data for Name: tipoequipo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipoequipo (id, nombre) FROM stdin;
1	Escritorio
2	Todo en uno
3	Portatil
\.


--
-- TOC entry 5110 (class 0 OID 16512)
-- Dependencies: 238
-- Data for Name: tiposo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tiposo (id, nombre) FROM stdin;
1	WINDOWS 11 PRO
2	WINDOWS 10 PRO
3	WINDOWS 8.1 PRO
4	UBUNTU
5	MAC
\.


--
-- TOC entry 5096 (class 0 OID 16419)
-- Dependencies: 224
-- Data for Name: tipousuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipousuario (id, nombre) FROM stdin;
1	Administrador
2	Asesor
3	Gerente
4	Tecnico
\.


--
-- TOC entry 5094 (class 0 OID 16403)
-- Dependencies: 222
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, usuario, password, creado_en, rol_id) FROM stdin;
1	manager	manager	$2b$10$p5lulC5TjbGTG.SO1OLiRusz0pNrj9D/mz1TQ1cLpW0RGZScWp4Aa	2026-09-25 23:52:34.494741	\N
\.


--
-- TOC entry 5127 (class 0 OID 0)
-- Dependencies: 231
-- Name: areas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.areas_id_seq', 5, true);


--
-- TOC entry 5128 (class 0 OID 0)
-- Dependencies: 229
-- Name: colaborador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colaborador_id_seq', 1, false);


--
-- TOC entry 5129 (class 0 OID 0)
-- Dependencies: 225
-- Name: equipos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipos_id_seq', 1, false);


--
-- TOC entry 5130 (class 0 OID 0)
-- Dependencies: 227
-- Name: estadoasignado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estadoasignado_id_seq', 1, false);


--
-- TOC entry 5131 (class 0 OID 0)
-- Dependencies: 219
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_seq', 1, true);


--
-- TOC entry 5132 (class 0 OID 0)
-- Dependencies: 235
-- Name: tipodisco_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipodisco_id_seq', 3, true);


--
-- TOC entry 5133 (class 0 OID 0)
-- Dependencies: 233
-- Name: tipoequipo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipoequipo_id_seq', 3, true);


--
-- TOC entry 5134 (class 0 OID 0)
-- Dependencies: 237
-- Name: tiposo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tiposo_id_seq', 5, true);


--
-- TOC entry 5135 (class 0 OID 0)
-- Dependencies: 223
-- Name: tipousuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipousuario_id_seq', 4, true);


--
-- TOC entry 5136 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


--
-- TOC entry 4931 (class 2606 OID 16491)
-- Name: areas areas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT areas_pkey PRIMARY KEY (id);


--
-- TOC entry 4927 (class 2606 OID 16482)
-- Name: colaborador colaborador_cedula_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborador
    ADD CONSTRAINT colaborador_cedula_key UNIQUE (cedula);


--
-- TOC entry 4929 (class 2606 OID 16480)
-- Name: colaborador colaborador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborador
    ADD CONSTRAINT colaborador_pkey PRIMARY KEY (id);


--
-- TOC entry 4923 (class 2606 OID 16454)
-- Name: equipos equipos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT equipos_pkey PRIMARY KEY (id);


--
-- TOC entry 4925 (class 2606 OID 16467)
-- Name: estadoasignado estadoasignado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadoasignado
    ADD CONSTRAINT estadoasignado_pkey PRIMARY KEY (id);


--
-- TOC entry 4915 (class 2606 OID 16401)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- TOC entry 4935 (class 2606 OID 16510)
-- Name: tipodisco tipodisco_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipodisco
    ADD CONSTRAINT tipodisco_pkey PRIMARY KEY (id);


--
-- TOC entry 4933 (class 2606 OID 16501)
-- Name: tipoequipo tipoequipo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipoequipo
    ADD CONSTRAINT tipoequipo_pkey PRIMARY KEY (id);


--
-- TOC entry 4937 (class 2606 OID 16519)
-- Name: tiposo tiposo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tiposo
    ADD CONSTRAINT tiposo_pkey PRIMARY KEY (id);


--
-- TOC entry 4921 (class 2606 OID 16426)
-- Name: tipousuario tipousuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipousuario
    ADD CONSTRAINT tipousuario_pkey PRIMARY KEY (id);


--
-- TOC entry 4917 (class 2606 OID 16415)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4919 (class 2606 OID 16417)
-- Name: usuarios usuarios_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_usuario_key UNIQUE (usuario);


--
-- TOC entry 4943 (class 2606 OID 16535)
-- Name: colaborador fk_colaborador_area; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborador
    ADD CONSTRAINT fk_colaborador_area FOREIGN KEY (area) REFERENCES public.areas(id);


--
-- TOC entry 4939 (class 2606 OID 16525)
-- Name: equipos fk_disco_tipo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT fk_disco_tipo FOREIGN KEY (tipodisco) REFERENCES public.tipodisco(id);


--
-- TOC entry 4940 (class 2606 OID 16520)
-- Name: equipos fk_equipos_tipo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT fk_equipos_tipo FOREIGN KEY (tipoequipo) REFERENCES public.tipousuario(id);


--
-- TOC entry 4941 (class 2606 OID 16530)
-- Name: equipos fk_sistema_tipo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT fk_sistema_tipo FOREIGN KEY (tiposistope) REFERENCES public.tiposo(id);


--
-- TOC entry 4942 (class 2606 OID 16540)
-- Name: equipos fk_usuario_creo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT fk_usuario_creo FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- TOC entry 4938 (class 2606 OID 16427)
-- Name: usuarios fk_usuarios_roles; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_usuarios_roles FOREIGN KEY (rol_id) REFERENCES public.tipousuario(id);


-- Completed on 2026-09-27 21:33:16

--
-- PostgreSQL database dump complete
--

\unrestrict uikxF0qbcLW2qLDMblgnGISOnPHgEMg8EGoc4boaVB1JzHYas9A9Tzh57CQ4YuQ

-- Completed on 2026-09-27 21:33:16

--
-- PostgreSQL database cluster dump complete
--

