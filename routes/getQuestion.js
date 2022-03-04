// 获取题目
const express = require("express");
const route = express();

route.get("/", (req, res) => {
    res.send([
        {
            question: "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
            correct_answer: "Apple1aa11",
            incorrect_answers: [
                "Microsoft",
                "Atari",
                "Commodore"
            ]
        },
        {
            question: "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
            correct_answer: "Apple",
            incorrect_answers: [
                "Microsoft",
                "Atari",
                "Commodore"
            ]
        },
        {
            question: "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
            correct_answer: "Apple",
            incorrect_answers: [
                "Microsoft",
                "Atari",
                "Commodore"
            ]
        },
        {
            question: "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
            correct_answer: "Apple",
            incorrect_answers: [
                "Microsoft",
                "Atari",
                "Commodore"
            ]
        },
        {
            question: "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
            correct_answer: "Apple",
            incorrect_answers: [
                "Microsoft",
                "Atari",
                "Commodore"
            ]
        },
    ]);
});


module.exports = route;