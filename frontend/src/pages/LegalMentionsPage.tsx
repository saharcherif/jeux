import { motion } from 'motion/react';

export function LegalMentionsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100"
                >
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                        Mentions Légales
                    </h1>
                    <div className="prose prose-pink max-w-none text-gray-600">
                        <p>Contenu à venir...</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
