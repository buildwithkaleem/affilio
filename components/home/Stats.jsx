export default function Stats() {
  const stats = [
    {
      value: "1,000+",
      label: "Products",
    },
    {
      value: "10K+",
      label: "Orders Tracked",
    },
    {
      value: "Rs. 1M+",
      label: "Commissions",
    },
    {
      value: "24/7",
      label: "Dashboard Access",
    },
  ];

  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <h3 className="text-2xl font-bold sm:text-3xl">
              {stat.value}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}