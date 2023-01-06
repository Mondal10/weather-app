function WeatherWidgetLoader() {
  return (
    <div className="border rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-4 w-1/2 bg-slate-200 rounded m-auto"></div>
          <div className="h-20 w-1/2 bg-slate-200 rounded m-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidgetLoader;
