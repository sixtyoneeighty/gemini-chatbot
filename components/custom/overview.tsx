import { SmileIcon, SunIcon, MessageIcon } from "./icons";

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
        <p className="flex flex-row justify-center gap-4 items-center text-zinc-900 dark:text-zinc-50">
          <SunIcon />
          <span>+</span>
          <SmileIcon />
          <span>+</span>
          <MessageIcon />
        </p>
        <p>
          Welcome to <strong>Nudist AI featuring Mojo</strong>, your hilarious,
          supportive guide to embracing naturism and boosting body positivity.
          Mojo helps you explore nudist-friendly places, navigate the nudist lifestyle,
          and feel awesome about your authentic self—no judgment, just great vibes.
        </p>
        <p>
          Mojo chats stay totally private—your conversations are stored locally,
          your images remain unseen by us, and your experience stays confidential.
          Relax, connect, and get comfortable in your own skin.
        </p>
      </div>
    </motion.div>
  );
};
