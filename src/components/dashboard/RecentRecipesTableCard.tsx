import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, Tooltip,} from "recharts";

type RecipeActivity = {
  month: string;
  views: number;
};

interface RecentRecipesTableCardProps {
  data?: RecipeActivity[];
}

const defaultData: RecipeActivity[] = [
  { month: "Ago", views: 18 },
  { month: "Sep", views: 25 },
  { month: "Oct", views: 20 },
  { month: "Nov", views: 35 },
  { month: "Dic", views: 28 },
  { month: "Ene", views: 42 },
  { month: "Feb", views: 38 },
  { month: "Mar", views: 55 },
];

export default function RecentRecipesTableCard({data = defaultData,}: RecentRecipesTableCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
      {/* header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Actividad de Recetas
          </h3>
          <p className="text-sm text-gray-500">
            Recetas vistas por mes
          </p>
        </div>

        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
          Últimos 8 meses
        </span>
      </div>

      {/* chart */}
      <div className="w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="recipeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#86efac" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#86efac" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              }}
            />

            <Area
              type="monotone"
              dataKey="views"
              stroke="none"
              fill="url(#recipeGradient)"
            />

            <Line
              type="monotone"
              dataKey="views"
              stroke="#34d399"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#34d399",
              }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}