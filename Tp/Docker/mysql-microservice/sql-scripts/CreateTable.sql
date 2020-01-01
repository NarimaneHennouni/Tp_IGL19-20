CREATE TABLE modules (
  id_module INT(11) ,
  nom_mod VARCHAR(11) ,
  CC FLOAT ,
  CI FLOAT ,
  TP FLOAT ,
  CF FLOAT ,
  Coeff INT(11) 
);

CREATE TABLE notes_thp (
  id_etud varchar(11) ,
  CC FLOAT ,
  CI FLOAT ,
  TP FLOAT ,
  CF FLOAT ,
  Moy FLOAT 
);

CREATE TABLE notes_anum (
  id_etud varchar(11) ,
  CC FLOAT ,
  CI FLOAT ,
  TP FLOAT ,
  CF FLOAT ,
  Moy FLOAT 
);

CREATE TABLE notes_igl (
  id_etud varchar(11) ,
  CC FLOAT ,
  CI FLOAT ,
  TP FLOAT ,
  CF FLOAT ,
  Moy FLOAT 
);

CREATE TABLE notes_res (
  id_etud varchar(11) ,
  CC FLOAT ,
  CI FLOAT ,
  TP FLOAT ,
  CF FLOAT ,
  Moy FLOAT 
);

CREATE TABLE moy_etudiants (
  id_etud varchar(11)  ,
  Moy_IGL FLOAT ,
  Moy_RES FLOAT ,
  Moy_ANUM FLOAT ,
  Moy_THP FLOAT ,
  Moyf FLOAT 
)
