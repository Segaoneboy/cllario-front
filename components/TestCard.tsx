"use client";

type Option = {
    value: string;
    label: string;
};

interface QuestionCardProps {
    question: string;
    name: string;
    register: any;
    options: Option[];
}

export default function QuestionCard({ question, name, register, options }: QuestionCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transition-all ">
            <h2 className="text-2xl font-bold text-[#4a63df] text-center mb-6">
                {question}
            </h2>

            <div className="space-y-3">
                {options.map((opt) => (
                    <label
                        key={opt.value}
                        className="flex items-center gap-3 border border-[#5170FF] focus:text-[#4a63df] rounded-xl p-3 cursor-pointer hover:bg-gray-50 transition"
                    >
                        <input
                            type="radio"
                            value={opt.value}
                            {...register(name, { required: true })}
                            className="h-5 w-5 accent-[#4a63df]"
                        />
                        <span className="text-lg">{opt.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
