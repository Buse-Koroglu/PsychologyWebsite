const { config } = require('../config/db');

exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Başlık ve içerik boş olamaz." });
  }

  const userId = req.session.user.id;

  try {
    const connection = await config(); // burası artık connection objesi
    const sql = "INSERT INTO posts (user_id, title, content, created_at) VALUES (?, ?, ?, NOW())";
    const [result] = await connection.execute(sql, [userId, title, content]);
    await connection.end(); // bağlantıyı kapattık
    return res.redirect('/posts'); // postumuzun eklendiği sayfaya yönledirme yaptım.
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Bir hata oluştu." });
  }
};
