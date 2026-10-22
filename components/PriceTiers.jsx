export default function PriceTiers({ tiers, tone = "night" }) {
  if (!tiers?.length) return null;

  return (
    <div className={`tier-scroll ${tone}`} tabIndex={0} role="region" aria-label="客室タイプ別の料金">
      <table className="tier-table">
        <caption>客室タイプ・曜日別の税込目安。公式料金表（2026-10-01）に基づきます。</caption>
        <thead>
          <tr>
            <th scope="col">タイプ</th>
            <th scope="col">客室</th>
            <th scope="col">REST 平日</th>
            <th scope="col">REST 土日祝</th>
            <th scope="col">STAY 日〜木</th>
            <th scope="col">STAY 金</th>
            <th scope="col">STAY 土・祝前</th>
            <th scope="col">延長</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr key={tier.name}>
              <th scope="row">{tier.name}</th>
              <td>{tier.rooms}</td>
              <td>{tier.restWeekday}</td>
              <td>{tier.restWeekend}</td>
              <td>{tier.staySunThu}</td>
              <td>{tier.stayFriday}</td>
              <td>{tier.staySaturday}</td>
              <td>{tier.extension}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
