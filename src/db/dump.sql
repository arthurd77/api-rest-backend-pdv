BEGIN;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id serial,
    nome text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT email UNIQUE (email)
        INCLUDE(email)
);

CREATE TABLE IF NOT EXISTS public.categorias
(
    id serial,
    descricao text NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO categorias (descricao) VALUES ('Informática'); 
INSERT INTO categorias (descricao) VALUES ('Celulares');
INSERT INTO categorias (descricao) VALUES ('Beleza e Perfumaria');
INSERT INTO categorias (descricao) VALUES ('Mercado'); 
INSERT INTO categorias (descricao) VALUES ('Livros e Papelaria'); 
INSERT INTO categorias (descricao) VALUES ('Brinquedos'); 
INSERT INTO categorias (descricao) VALUES ('Moda'); 
INSERT INTO categorias (descricao) VALUES ('Bebê'); 
INSERT INTO categorias (descricao) VALUES ('Games');

create table produtos (
id serial primary key,
 descricao varchar(200),
  quantidade_estoque integer,
  valor integer,
  categoria_id integer,
  foreign key (categoria_id) references categorias(id)
);

create table clientes(
id serial primary key,
  nome text not null,
  email  varchar(200) not null unique,
  cpf varchar(11) not null unique,
  cep varchar(8),
  rua varchar(100),
  numero varchar(10),
  bairro varchar(100),
  cidade varchar(100),
  estado varchar(50)
);

create table pedidos(
	id serial primary key,
  cliente_id integer not null references clientes(id),
  observacao text,
  valor_total integer
);

create table pedido_produtos(
	id serial primary key,
  pedido_id integer not null references pedidos(id),
  produto_id integer not null references produtos(id),
  quantidade_produto integer,
  valor_produto integer
);

alter table produtos add produto_imagem bytea;

ALTER TABLE produtos
ADD COLUMN produto_imagem_temp VARCHAR(500)

UPDATE produtos
SET produto_imagem_temp = convert_from(produto_imagem, 'UTF8')


ALTER TABLE produtos
DROP COLUMN produto_imagem;

ALTER TABLE produtos
RENAME COLUMN produto_imagem_temp TO produto_imagem;



END;