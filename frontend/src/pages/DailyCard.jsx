import React from "react";

export default function DailyCard() {
  return (
    <section className="grid grid-cols-3 gap-4 pt-4">
      {/* For the left pane in which you'll find your goals. Should be toggled. No option on submit? */}
      <div className="col-span-1">
        <h1>Div1</h1>
      </div>
      {/* main section for building out the scorecard */}
      <div className="col-span-2">
        <h1>Div2</h1>
      </div>
    </section>
  );
}
