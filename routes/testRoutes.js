const express = require("express");
const { config } = require("../config/db");
const router = express.Router();

router.get("/tests/:id" ,async(req,res)=>{
    const testId = req.params.id;

    try {
        const db = await config();

        const query = `  SELECT t.id AS test_id,
           t.title AS test_title,
           t.description AS test_description,
           q.id AS question_id,
           q.content AS question_content,
           q.category AS question_category,
           o.id AS option_id,
           o.content AS option_content,
           o.value AS option_value
           FROM tests t
           LEFT JOIN questions q ON t.id = q.test_id
         LEFT JOIN options o ON q.id = o.question_id
         WHERE t.id = ?;
        ` ;  

        const [results] = await db.query(query,[testId]); // results'da objeler içeren bir array olarak tuttuk. 
        if(results.length === 0){
            return res.status(404).json({message: "Test Bulunmamaktadır."});
        }  

        const testInfo = {
            id:results[0].test_id,
            title:results[0].test_title,
            description:results[0].test_description,
            questions:[],
        };

        const questionData = {};

        results.forEach(element => {
            if(!questionData[element.question_id]){
                questionData[element.question_id] = {
                    id: element.question_id,
                    content: element.question_content,
                    category: element.question_category,
                    options :[],
                } ;
                testInfo.questions.push(questionData[element.question_id]);
            }

            questionData[element.question_id].options.push({
                id: element.option_id,
                content: element.option_content,
                value:element.option_value,
            });
        })
;

        res.json(testInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:error.message});
    }
  
}

    
);

router.get("/results/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const db = await config(); 
    const query = "SELECT title, description FROM results WHERE id = ?";
    const [results] = await db.query(query, [id]);
    if (results.length === 0)
      return res.status(404).json({ message: "Sonuç bulunamadı" });

    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
