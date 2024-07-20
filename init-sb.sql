PGDMP  '    8                |            NPC_IRS_TEST    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    73820    NPC_IRS_TEST    DATABASE     �   CREATE DATABASE "NPC_IRS_TEST" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "NPC_IRS_TEST";
                postgres    false            �            1259    82012    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    73869 	   addresses    TABLE     �   CREATE TABLE public.addresses (
    id integer NOT NULL,
    street character varying(255) NOT NULL,
    district character varying(255) NOT NULL
);
    DROP TABLE public.addresses;
       public         heap    postgres    false            �            1259    73868    addresses_id_seq    SEQUENCE     �   CREATE SEQUENCE public.addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.addresses_id_seq;
       public          postgres    false    216            �           0    0    addresses_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;
          public          postgres    false    215            �            1259    73878 	   residents    TABLE     �   CREATE TABLE public.residents (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    birth_date date NOT NULL,
    debt numeric NOT NULL,
    address_id integer
);
    DROP TABLE public.residents;
       public         heap    postgres    false            �            1259    73877    residents_id_seq    SEQUENCE     �   CREATE SEQUENCE public.residents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.residents_id_seq;
       public          postgres    false    218            �           0    0    residents_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.residents_id_seq OWNED BY public.residents.id;
          public          postgres    false    217            Y           2604    73872    addresses id    DEFAULT     l   ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);
 ;   ALTER TABLE public.addresses ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            Z           2604    73881    residents id    DEFAULT     l   ALTER TABLE ONLY public.residents ALTER COLUMN id SET DEFAULT nextval('public.residents_id_seq'::regclass);
 ;   ALTER TABLE public.residents ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �          0    82012    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    219   R       �          0    73869 	   addresses 
   TABLE DATA           9   COPY public.addresses (id, street, district) FROM stdin;
    public          postgres    false    216   �       �          0    73878 	   residents 
   TABLE DATA           \   COPY public.residents (id, first_name, last_name, birth_date, debt, address_id) FROM stdin;
    public          postgres    false    218   �       �           0    0    addresses_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.addresses_id_seq', 13, true);
          public          postgres    false    215            �           0    0    residents_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.residents_id_seq', 23, true);
          public          postgres    false    217            `           2606    82016     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    219            \           2606    73876    addresses addresses_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.addresses DROP CONSTRAINT addresses_pkey;
       public            postgres    false    216            ^           2606    73885    residents residents_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.residents
    ADD CONSTRAINT residents_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.residents DROP CONSTRAINT residents_pkey;
       public            postgres    false    218            a           2606    73886 #   residents residents_address_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.residents
    ADD CONSTRAINT residents_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.addresses(id);
 M   ALTER TABLE ONLY public.residents DROP CONSTRAINT residents_address_id_fkey;
       public          postgres    false    216    4700    218            �   o   x�320210746�0631��p��
��*�2��X��&���pQjq�g�nI�.�����WR������D79#1/=U=��������� hXn~�������<��=... �(1q      �   �   x�u�I
1D׿#��w�0�((8���I;���+Կ��t\H���WQ�H(XjK{��'"�g<��uD�u�{� 'X�����<ֽ����ė����p�#�`�<��]�쳴�`�w���✼��D֩�ձw���K�-:���e�4i�r����BLG�X\V��*������-�f�0è/�0d��]��'�m�{;$��k� ޵;)�      �     x�MS[n�@����Asg���)A�U	�C�����F&MT�	fwv�9㸍�8�}�5*��v6�ߧ�l'����%BuQ�=>�U^�nc~'��y���c��ڇ�k-�]�%�OvB-�F{��oo���=(>I�H��lG;p��&��{<������ ;*W���#1ى�&��L�^��Ԭ�]�����H"*[>̄옯��������K��Ƶ�O\�C����l&����/��{Ui�պN�[�6p8+P��B�އ�c+{:׳h�oPHb7X��=�ql�pI��i�^�ߑ��B��^ri|h�v�����X	�x BB���#˝����@��\�
����|R��8r<�2p�����ٖ��WX��%P[�>����nv�k$��~S�^�^)N����4z`����x��HBo�e,vЍ�+1ݰ�vs��2��U(��`cI� _�����ǧ���w)���A�BQ0y��G&L�4��e�v��_/����̘�@�3\3Zs|(�""cE�J5��/�s����     