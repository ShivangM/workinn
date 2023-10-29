import classNames from 'classnames';

type TableRowProps = {
  label: string;
  value: string;
  bold?: boolean;
};

const TableRow: React.FC<TableRowProps> = ({
  label,
  value,
  bold,
}: TableRowProps) => {
  return (
    <tr className="border-b border-opacity-20">
      <td className="p-3 font-semibold">
        <p>{label}</p>
      </td>
      <td className={classNames('p-3', bold ? 'font-bold text-black' : '')}>
        <p>{value}</p>
      </td>
    </tr>
  );
};

export default TableRow;
