const Information = () => {
  const tableHead = [
    {
      className:
        'font-poppins font-semibold text-base text-white text-center w-[10%] py-[10px]',
      name: '#',
    },
    {
      className:
        'font-poppins font-semibold text-base text-white text-center w-[20%]',
      name: 'Land Rarity',
    },
    {
      className:
        'font-poppins font-semibold text-base text-white text-center w-[50%]',
      name: 'Number of people can buy',
    },
    {
      className:
        'font-poppins font-semibold text-base text-white text-center w-[20%]',
      name: 'Total residents',
    },
  ]
  const tableBody = [
    { id: 'Tier 1', rarity: 'Epic', no: '4', total: '400' },
    { id: 'Tier 2', rarity: 'Rare', no: '6', total: '240' },
    { id: 'Tier 3', rarity: 'Common', no: '20', total: '700' },
    { id: 'Tier 4', rarity: 'Common', no: '6', total: '200' },
  ]

  return (
    <div className="flex flex-col space-y-4 mt-8 w-full">
      <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
        Rule
      </span>
      <div className="grid md:grid-cols-2 grid-cols-1 w-full items-center gap-8">
        <div className="referral__information p-6">
          <ul className=" ml-4">
            <li className="font-poppins font-medium text-base text-white list-disc">
              Users will stake MSP Tokens in exchange for points and have a top
              point ranking to get the right to buy Lands.
            </li>
            <li className="font-poppins font-medium text-base text-white list-disc">
              Each 100 MSP for 1 hour get 10 points.
            </li>
            <li className="font-poppins font-medium text-base text-white list-disc">
              Top 25 will buy Lands.
            </li>
            <li className="font-poppins font-medium text-base text-white list-disc">
              Users who have more than 1000 points but are not at the top will
              be randomly selected 5 people to buy 1 Common Lands
            </li>
            <li className="font-poppins font-medium text-base text-white list-disc">
              After all people on the whitelist have purchased, the remaining
              Lands will be sold to those who come first, and will end as soon
              as all Lands are sold out, each person only can buy 1 Land
            </li>
          </ul>
        </div>
        <div className="border-[0.5px] border-[#353A45] rounded-xl overflow-hidden">
          <table className="referral__information__table w-full xl:p-4">
            <thead>
              <tr>
                {tableHead.map((item, index) => (
                  <th key={index} className={item.className}>
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableBody &&
                tableBody?.map((item, index) => (
                  <tr key={index} className="border_style">
                    <td className="font-poppins font-medium text-white text-base text-center py-[15.5px]">
                      {item.id}
                    </td>
                    <td className="font-poppins font-medium text-white text-base text-center">
                      {item.rarity}
                    </td>
                    <td className="font-poppins font-medium text-white text-base text-center">
                      {item.no}
                    </td>
                    <td className="font-poppins font-medium text-white text-base text-center">
                      {item.total}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Information
