const prisma = require("../database/prisma");

class LogBookController {
  saveUserData = async (req, res, next) => {
    try {
      //check duplicate address
      const checkAddress = await prisma.user.findUnique({
        where: { address: req.body.address },
      });
      if (checkAddress) {
        return res.json({ Message: "DuplicateError" });
      }
      await prisma.user.create({
        data: {
          propertyType: req.body.propertyType,
          bedrooms: req.body.bedrooms,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          price: req.body.price,
          furnitureType: req.body.furnitureType,
          name: req.body.name,
          note: req.body.note,
          address: req.body.address,
          addNote: {
            create: {
              propertyTypeNote: "",
              bedroomsNote: "",
              furnitureTypeNote: "",
            },
          },
        },
      });
      return res.json({ Message: "OK" });
    } catch (error) {
      res.json({ Message: "internalError" });
      return next(error);
    }
  };

  rentalList = async (req, res, next) => {
    try {
      const rentalList = await prisma.user.findMany();
      return res.json(rentalList);
    } catch (error) {
      return next(error);
    }
  };
  deleteItem = async (req, res, next) => {
    try {
      await prisma.user.delete({
        where: {
          id: req.body.id,
        },
      });
      return res.json({ message: "OK" });
    } catch (error) {
      res.json({ message: "ERROR" });
      return next(error);
    }
  };

  search = async (req, res, next) => {
    const address = req.params.address;
    if (address.length === 0) {
      return res.json({ Message: "NOPE" });
    }
    try {
      const newList = await prisma.user.findMany({
        where: {
          address: {
            contains: address,
            mode: `insensitive`,
          },
        },
      });
      return res.json(newList);
    } catch (error) {
      res.json({ Message: "NOPE" });
      return next(error);
    }
  };

  editItem = async (req, res, next) => {
    try {
      await prisma.addNote.updateMany({
        where: {
          userId: req.body.userId,
        },
        data: {
          propertyTypeNote: req.body.propertyTypeNote,
          bedroomsNote: req.body.bedroomsNote,
          furnitureTypeNote:
            req.body.furnitureTypeNote === undefined ? "null" : req.body.furnitureTypeNote,
        },
      });
      return res.json({ message: "OK" });
    } catch (error) {
      res.json({ message: "ERROR" });
      return next(error);
    }
  };
  currentNote = async (req, res, next) => {
    try {
      const note = await prisma.addNote.findMany({
        where: {
          userId: req.params.id,
        },
        select: {
          userId: true,
          propertyTypeNote: true,
          bedroomsNote: true,
          furnitureTypeNote: true,
        },
      });

      return res.json(note[0]);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new LogBookController();
