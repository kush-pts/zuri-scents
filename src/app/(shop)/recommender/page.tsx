"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { questions, getRecommendations, type AnswerOption } from "@/lib/recommender-engine";

export default function RecommenderPage() {
    const [started, setStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, AnswerOption>>({});
    const [result, setResult] = useState<string | null>(null);

    const currentQuestion = questions[currentQuestionIndex];

    const handleStart = () => setStarted(true);

    const handleAnswer = (option: AnswerOption) => {
        const newAnswers = { ...answers, [currentQuestion.id]: option };
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Finished
            const scentProfile = getRecommendations(newAnswers);
            setResult(scentProfile);
        }
    };

    const resetQuiz = () => {
        setStarted(false);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setResult(null);
    };

    if (!started) {
        return (
            <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl md:text-6xl font-serif text-parfumerie-gold mb-6 animate-fade-in-up">Discover Your Essence</h1>
                <p className="text-xl text-parfumerie-gray mb-10 max-w-lg">
                    Take our AI-powered scent profile quiz to find the fragrance that perfectly matches your personality and style.
                </p>
                <Button size="lg" onClick={handleStart} className="text-lg px-8 py-6">Begin Journey</Button>
            </div>
        );
    }

    if (result) {
        return (
            <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in">
                <h2 className="text-2xl text-parfumerie-gray mb-4">Your Signature Scent Profile is</h2>
                <h1 className="text-5xl md:text-7xl font-serif text-parfumerie-gold mb-8">{result}</h1>
                <p className="text-lg text-parfumerie-gray mb-10 max-w-lg">
                    Based on your preferences, we believe a {result.toLowerCase()} fragrance will suit you best.
                </p>
                <div className="flex gap-4">
                    <Link href={`/shop?category=${result}`}>
                        <Button size="lg" className="text-lg">View Recommendations</Button>
                    </Link>
                    <Button variant="outline" onClick={resetQuiz} className="text-lg">Retake Quiz</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 min-h-[60vh] flex flex-col items-center justify-center">
            <Card className="w-full max-w-2xl border-parfumerie-gold/20 shadow-xl">
                <CardHeader className="text-center">
                    <span className="text-sm uppercase tracking-widest text-parfumerie-gray mb-2">Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <CardTitle className="text-2xl md:text-3xl font-serif">{currentQuestion.text}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleAnswer(option)}
                            className="p-6 text-left rounded-lg border border-parfumerie-gray/20 hover:border-parfumerie-gold hover:bg-parfumerie-gold/5 transition-all duration-300 group"
                        >
                            <span className="text-lg font-medium group-hover:text-parfumerie-gold transition-colors">{option.label}</span>
                        </button>
                    ))}
                </CardContent>
                <CardFooter className="justify-center pb-8">
                    <Button variant="ghost" onClick={resetQuiz} className="text-sm text-parfumerie-gray hover:text-red-500">Cancel</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
