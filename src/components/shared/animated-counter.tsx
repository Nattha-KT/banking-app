'use client';

import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full text-lime-400">
      <CountUp decimals={2} decimal="." prefix="$" end={amount} />
    </div>
  );
};

export default AnimatedCounter;
