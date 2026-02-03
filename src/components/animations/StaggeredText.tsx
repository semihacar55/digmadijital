import { motion } from 'framer-motion';

export const StaggeredText = ({ text, className = "" }: { text: string, className?: string }) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            } as any,
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={`inline-block ${className}`}
        >
            {words.map((word, index) => (
                <motion.span variants={child} key={index} className="inline-block mr-[0.25em]">
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};
