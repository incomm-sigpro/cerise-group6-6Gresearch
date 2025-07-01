import { PermissionTypeGroup, PrismaClient, Roles } from "@prisma/client";
import argon2id from "argon2";

const prisma = new PrismaClient();

/**
 * Criação do usuário root
 */
const createRootUser = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    await prisma.user.create({
      data: {
        name: "Administrador",
        email: "jonas@email.com",
        password: await argon2id.hash("123456"),
      },
    });
  }
};

createRootUser(prisma);

// Criação de usuários padrão
const createUsers = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();
  const newUsers = [
    {
      name: "Jonas A Kunzler",
      email: "k_jonasaugusto@ufg.br",
      password: await argon2id.hash("123456"),
      isActive: true,
      birthday: "1989-06-27T00:00:01.507Z",
    },
  ];

  const nonexistentUsers = newUsers.filter(
    (user) => !users.find((u) => u.email === user.email),
  );

  await prisma.user.createMany({
    data: nonexistentUsers,
  });
};

createUsers(prisma);

// Criação das roles padrão
const createRoles = async (prisma: PrismaClient) => {
  const allRoles = [
    {
      name: "Admin",
      type: PermissionTypeGroup.USER_ADMIN,
      role: Roles.IS_ADMIN,
    },
    {
      name: "Client",
      type: PermissionTypeGroup.USER,
      role: Roles.IS_CLIENT,
    },
    {
      name: "Support",
      type: PermissionTypeGroup.USER_ADMIN,
      role: Roles.IS_SUPPORT,
    },
  ];

  const roles = await prisma.permissionGroups.findMany();

  const nonexistentRoles = allRoles.filter(
    (role) => !roles.find((r) => r.role === role.role),
  );

  if (nonexistentRoles.length > 0) {
    await prisma.permissionGroups.createMany({
      data: nonexistentRoles,
    });
  }
};

createRoles(prisma);

// Atribuição de roles a usuário específico
const assignSpecificRole = async (prisma: PrismaClient) => {
  const user = await prisma.user.findFirst({
    where: {
      email: "k_jonasaugusto@ufg.br",
    },
  });

  const permissions = await prisma.permissionGroups.findMany();
  const permission = permissions.find(
    (permission) => permission.role === Roles.IS_CLIENT,
  );

  if (user && permission) {
    await prisma.userPermissionGroups.create({
      data: {
        userId: user.id,
        permissionGroupId: permission.id,
      },
    });
  }
};

assignSpecificRole(prisma);

// Atribuição de roles aos usuários padrão
const assignRoles = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();
  const permissions = await prisma.permissionGroups.findMany();
  const permission = permissions.find(
    (permission) => permission.role === Roles.IS_ADMIN,
  );
  const usersPermissions = await prisma.userPermissionGroups.findMany();
  const nonexistentUserPermissionGroups = users.filter(
    (user) => !usersPermissions.find((p) => p.userId === user.id),
  );

  nonexistentUserPermissionGroups.forEach(async (user) => {
    if (permission) {
      await prisma.userPermissionGroups.create({
        data: {
          userId: user.id,
          permissionGroupId: permission.id,
        },
      });
    }
  });
};

assignRoles(prisma);

// Criação de mensagem padrão
const createMessages = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();
  const messages = await prisma.message.findMany();
  const firstMessage = {
    title: "Bem vindo ao sistema",
    content: "Olá, seja bem vindo ao sistema inventário do Cerise.",
    type: "info",
  };

  const nonexistentUserFirstMessage = users.filter(
    (user) => !messages.find((m) => m.userId === user.id),
  );

  nonexistentUserFirstMessage.forEach(async (user) => {
    const userId = user.id;
    await prisma.message.create({
      data: {
        ...firstMessage,
        userId,
      },
    });
  });
};

createMessages(prisma);

// Criação das principais empresas
const createCorporation = async (prisma: PrismaClient) => {
  const corporations = await prisma.corporation.findMany();
  const newCorporations = [
    {
      name: "Cerise",
      cnpj: "99.999.999/0001-61"
    },
  ];

  const nonexistentCorporations = newCorporations.filter(
    (corporation) => !corporations.find((c) => c.cnpj === corporation.cnpj),
  );

  if (corporations.length === 0) {
    await prisma.corporation.createMany({
      data: nonexistentCorporations,
    });
  }
};

createCorporation(prisma);

// Atribuição de empresa aos usuários padrão
const assignCorporation = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();
  const corporation = await prisma.corporation.findFirst({
    where: {
      cnpj: "99.999.999/0001-61",
    },
  });
  const userCorporation = await prisma.userCorporation.findMany();

  const nonexistentUserCorporation = users.filter(
    (user) => !userCorporation.find((u) => u.userId === user.id),
  );

  if (corporation) {
    for (const user of nonexistentUserCorporation) {
      await prisma.userCorporation.create({
        data: {
          userId: user.id,
          corporationId: corporation.id,
        },
      });
    }
  }
};

assignCorporation(prisma);

// Criação de endereço para empresa
const createAddress = async (prisma: PrismaClient) => {
  const addresses = await prisma.address.findMany();
  const corporations = await prisma.corporation.findFirst();

  if (corporations && addresses.length === 0) {
    await prisma.address.create({
      data: {
        street: "AVENIDA UNIVERSITÁRIA",
        number: "1488",
        complement: "BLOCO ENGENHARIAS",
        sector: "Setor Universitário",
        city: "Goiânia",
        state: "Goiás",
        country: "Brasil",
        zipCode: "74605-010",
        corporationId: corporations.id,
      },
    });
  }
};

createAddress(prisma);

// Criação das principais categorias
const createCategories = async (prisma: PrismaClient) => {
  const categories = await prisma.category.findMany();

  if (categories.length === 0) {
    await prisma.category.createMany({
      data: [
        {
          id: "1",
          name: "Módulos 5G",
          description:
            "Módulos 5G são componentes eletrônicos usados em dispositivos de comunicação 5G, como smartphones, tablets, modems e roteadores.",
          scope: "SCOPE_01",
        },
      ],
    });
  }
};

createCategories(prisma);
