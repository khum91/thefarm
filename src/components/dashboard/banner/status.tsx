import clsx from 'clsx';

export default function BannerStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-green-200 text-black': status === 'active',
          'bg-gray-200 text-black': status === 'inactive',
        },
      )}
    >
      {status === 'active' ? (
        <>
          Published
        </>
      ) : null}
      {status === 'inactive' ? (
        <>
          Unpublished
        </>
      ) : null}
    </span>
  );
}
