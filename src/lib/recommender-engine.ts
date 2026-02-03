export type AnswerOption = {
    label: string;
    value: string; // Maps to a scent profile or attribute
    score: Record<string, number>; // Points for each profile: { Floral: 2, Fresh: 1 }
};

export type Question = {
    id: number;
    text: string;
    options: AnswerOption[];
};

export const questions: Question[] = [
    {
        id: 1,
        text: "How would you describe your ideal day?",
        options: [
            {
                label: "A walk through a blooming garden",
                value: "garden",
                score: { Floral: 3, Fresh: 1, Oriental: 0, Woody: 0 }
            },
            {
                label: "Reading a book by a fireplace",
                value: "fireplace",
                score: { Floral: 0, Fresh: 0, Oriental: 2, Woody: 3 }
            },
            {
                label: "A refreshing dip in the ocean",
                value: "ocean",
                score: { Floral: 0, Fresh: 3, Oriental: 0, Woody: 1 }
            },
            {
                label: "Exploring a spice market at sunset",
                value: "market",
                score: { Floral: 1, Fresh: 0, Oriental: 3, Woody: 1 }
            },
        ]
    },
    {
        id: 2,
        text: "Which season do you feel most connected to?",
        options: [
            { label: "Spring", value: "spring", score: { Floral: 3, Fresh: 2 } },
            { label: "Summer", value: "summer", score: { Fresh: 3, Floral: 1 } },
            { label: "Autumn", value: "autumn", score: { Woody: 2, Oriental: 2 } },
            { label: "Winter", value: "winter", score: { Oriental: 3, Woody: 3 } },
        ]
    },
    {
        id: 3,
        text: "What vibe are you going for?",
        options: [
            { label: "Romantic & Soft", value: "romantic", score: { Floral: 3 } },
            { label: "Bold & Mysterious", value: "bold", score: { Oriental: 3, Woody: 1 } },
            { label: "Clean & Energetic", value: "clean", score: { Fresh: 3 } },
            { label: "Grounded & Earthy", value: "earthy", score: { Woody: 3 } },
        ]
    }
];

export function getRecommendations(answers: Record<number, AnswerOption>) {
    const scores: Record<string, number> = {
        Floral: 0,
        Fresh: 0,
        Oriental: 0,
        Woody: 0,
    };

    Object.values(answers).forEach((answer) => {
        Object.entries(answer.score).forEach(([profile, points]) => {
            if (scores[profile] !== undefined) {
                scores[profile] += points;
            }
        });
    });

    // Find the highest score
    let maxScore = -1;
    let topProfile = "";

    Object.entries(scores).forEach(([profile, score]) => {
        if (score > maxScore) {
            maxScore = score;
            topProfile = profile;
        }
    });

    return topProfile;
}
