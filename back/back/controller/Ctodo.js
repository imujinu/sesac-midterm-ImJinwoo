const { Todo } = require("../models/index");

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  const result = await Todo.findAll();
  res.send(result);
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Todo.findOne({
      where: {
        id,
      },
    });
    if (Boolean(result)) {
      res.send(result);
    } else {
      res.send({ message: " Todo not found" });
    }
  } catch (err) {
    console.error("err:" + err);
  }
};

/* 새로운 Todo 생성 */
exports.create = async (req, res) => {
  const { title, done } = req.body;
  if (title) {
    const result = await Todo.create({ title, done });
    if (Boolean(result)) {
      res.send(result);
    } else {
      res.send({ message: "internal Server Error" });
    }
  } else {
    res.send({ message: "internal Server Error" });
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  try {
    const { done } = req.body;
    const { id } = req.params;

    const [result] = await Todo.update({ done }, { where: { id } });

    if (Boolean(result)) {
      res.send(result);
    } else {
      res.send({ message: "Todo not found" });
    }
  } catch {}
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.destroy({
      where: {
        id,
      },
    });
    if (Boolean(result)) {
      res.send({ message: "todo delete successfully", deleteId: id });
    } else {
      res.send({ message: "Todo not found" });
    }
  } catch {}
};
