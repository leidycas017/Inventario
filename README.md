Descripción del proyecto{

Descripción general
El proyecto tiene como objetivo desarrollar una aplicación web de administración de inventario. La 
aplicación permitirá a los usuarios gestionar materiales y movimientos de inventario, así como 
administrar usuarios con diferentes roles. La web se construirá utilizando tecnologías como NextJS, 
React, y TailwindCSS, y se integrará con una base de datos en Supabase.

Funcionalidades:
• Autenticación de usuarios
• Página de landing con opción para iniciar sesión
• Sidebar con enlaces a diferentes páginas (Inventarios, Materiales, Usuarios)
• Gestión de inventarios con visualización de movimientos y gráficas
• Gestión de materiales con opción para agregar nuevos
• Gestión de usuarios con roles diferenciados (ADMIN, USER)

Descripción de las tablas:
• Account: Almacena información de cuentas de proveedores externos para autenticación. Esta 
tabla es usada por NextAuth y no debe ser modificada en el backend.
• Session: Almacena sesiones de usuario. Esta tabla es usada por NextAuth y no debe ser 
modificada en el backend.
• User: Almacena información de los usuarios, incluyendo un rol asignado.
• Material: Almacena materiales que se pueden gestionar en el inventario.
• InventoryMovement: Almacena movimientos de inventario (entradas y salidas de materiales).
• Role: Almacena roles disponibles en el sistema (ADMIN, USER).
• VerificationToken: Almacena tokens para verificación de usuarios. Esta tabla es usada por 
NextAuth y no debe ser modificada en el backend.
Relaciones:
• User tiene una relación uno a muchos con Account, Session, Material, e InventoryMovement.
• Material tiene una relación uno a muchos con InventoryMovement.
• Role tiene una relación uno a muchos con User.
Descripción de roles:
• ADMIN: Tiene acceso completo a todas las funcionalidades, incluida la gestión de usuarios y la 
creación de materiales.
• USER: Tiene acceso a la gestión de inventarios y materiales, pero no puede administrar usuarios 
ni crear nuevos materiales.
