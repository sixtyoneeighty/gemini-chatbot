import { motion } from "framer-motion";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-[500px] mt-20 mx-4 md:mx-0"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="border-none bg-muted/50 rounded-2xl p-6 flex flex-col gap-4 text-zinc-500 text-sm dark:text-zinc-400 dark:border-zinc-700">
        <p className="text-zinc-900 dark:text-zinc-50">
          Nerdist AI is your nerdy, witty, and body-positive buddy, here to encourage self-acceptance, boost confidence, and help normalize the nudist lifestyle in a fun, judgment-free way. Think of me as a mix of your favorite D&D dungeon master, a gaming partner who knows all the cheat codes, and a friend who cheers you on as you embrace being your natural, awesome self.
        </p>
      </div>
    </motion.div>
  );
};
