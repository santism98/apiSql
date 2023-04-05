-----------------------------
-----IMPORTANTE EL ORDEN-----
-----------------------------


--CREAR TABLA AUTHOR
CREATE TABLE authors (
  id_author serial NOT NULL PRIMARY KEY, 
  name varchar(45) NOT NULL, 
  surname varchar(45) NOT NULL, 
  email varchar(100) NOT NULL UNIQUE,
  image varchar(255)
);

--CREAR TABLA ENTRIES
CREATE TABLE entries (
  id_entry serial NOT NULL PRIMARY KEY, 
  title varchar(100) NOT NULL, 
  content text NOT NULL, 
  date date DEFAULT CURRENT_DATE,
  id_author int,
  category varchar(15),
  FOREIGN KEY (id_author) REFERENCES authors(id_author)
);


--DATOS PRUEBA AUTORES

INSERT INTO authors(name,surname,email,image)
VALUES
('Luis','Luisito','luis@correo.es','https://randomuser.me/api/portraits/thumb/men/22.jpg'),
('Ana','Anita','ana@correo.es','https://randomuser.me/api/portraits/thumb/women/45.jpg'),
('Pedro','Pedrito','pedro@correo.es','https://randomuser.me/api/portraits/thumb/men/33.jpg'),
('Maria','Mariela','maria@correo.es','https://randomuser.me/api/portraits/thumb/women/56.jpg');

--DATOS PRUEBA ENTRIES
INSERT INTO entries(title,content,id_author,category)
VALUES
('Noticia: Nueva especie de árbol descubierta','Contenido noticia 1',(SELECT id_author FROM authors WHERE email='luis@correo.es'),'Ciencia'),
('Noticia: Concierto en el estadio de futbol','El grupo musical más popular dará un concierto en el estadio de futbol',(SELECT id_author FROM authors WHERE email='ana@correo.es'),'Musica'),
('La lluvia de estrellas ilumina la noche','La lluvia de estrellas más grande de la historia se pudo ver en todo el mundo',(SELECT id_author FROM authors WHERE email='pedro@correo.es'),'Ciencia'),
('Un nuevo robot que cambia el mundo','El robot más avanzado que se ha creado hasta ahora',(SELECT id_author FROM authors WHERE email='maria@correo.es'),'Tecnologia'),
('El fenómeno paranormal en la casa encantada','Los fantasmas aparecen cada noche en la casa encantada',(SELECT id_author FROM authors WHERE email='pero@correo.es'),'Sucesos');