// const { PrismaClient } = require("@prisma/client/edge");

// const db = new PrismaClient();

// async function main(userId : string) {
//   // create a User Sub
//   try {
//   await db.userSubscription.create({
//     data: {
//       userId: userId,
//       stripeSubscriptionId: "sub_1",
//       // now + 1000 days
//       stripeCurrentPeriodEnd: new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
//       stripeCustomerId: "cus_1",
//       stripePriceId: "price_1",
//     },
//   });
 
//   }
//   catch (error) {
//     console.error("Error seeding default companions", error);s
//   }
//   finally {
//     await db.$disconnect();
//   }
// }

// let userId = "1";
// main(userId);
