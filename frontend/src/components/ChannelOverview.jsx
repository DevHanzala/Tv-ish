const stats = [
  { title: 'Views', value: '150', percent: '+12%', color: 'text-green-500' },
  { title: 'Watch time', value: '150', percent: '-12%', color: 'text-red-500' },
  { title: 'Subscribers', value: '15', percent: '+13%', color: 'text-green-500' },
  { title: 'Earnings', value: '$150', percent: '-12%', color: 'text-red-500' },
];

const ChannelOverview = () => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">My Channel Overview</h2>
      <div className="grid grid-cols-4 gap-4 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-900 p-4 rounded">
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
            <p className={`text-sm mt-1 ${stat.color}`}>{stat.percent}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelOverview;
