import React from 'react'
import Question from './Question'

function QuestionList({ questions, deleteQuestion }) {

    console.log(questions)
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Voting</h3>
            {questions.length > 0 ?
                questions.map((question) => (
                    <Question key={question.id} question={question} deleteQuestion={deleteQuestion}/>
                )) :
                <p className="text-gray-500">No voting</p>
            }
        </div>
    )
}

export default QuestionList