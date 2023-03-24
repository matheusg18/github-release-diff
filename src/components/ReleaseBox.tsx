/* eslint-disable @next/next/no-img-element */
import IRelease from '@/typescript/interfaces/IRelease';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

type PropTypes = {
  release: IRelease;
};

export default function ReleaseBox({ release }: PropTypes) {
  return (
    <div className="my-10 w-full rounded border p-10 shadow">
      <h2 className="mb-10 text-2xl">{release.tagName}</h2>

      <div className="">
        <ReactMarkdown
          remarkPlugins={[gfm]}
          components={{
            h1: ({ node, ...props }) => <h2 className="text-4xl font-extrabold" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-3xl font-extrabold" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-2xl font-extrabold" {...props} />,
            h4: ({ node, ...props }) => <h4 className="text-xl font-bold" {...props} />,
            h5: ({ node, ...props }) => <h5 className="text-lg font-bold" {...props} />,
            h6: ({ node, ...props }) => <h6 className="text-base font-bold" {...props} />,
            a: ({ node, ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
            em: ({ node, ...props }) => <em className="italic" {...props} />,
            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4" {...props} />,
            br: ({ node, ...props }) => <br className="my-4" {...props} />,
            p: ({ node, ...props }) => <p className="my-4" {...props} />,
            ul: ({ node, ordered, ...props }) => <ul className="ml-8 list-disc" {...props} />,
            ol: ({ node, ordered, ...props }) => <ol className="ml-8 list-decimal" {...props} />,
            li: ({ node, ordered, ...props }) => <li className="my-2" {...props} />,
            table: ({ node, ...props }) => <table className="w-full table-auto" {...props} />,
            thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
            tbody: ({ node, ...props }) => <tbody className="bg-white" {...props} />,
            tr: ({ node, ...props }) => <tr className="border-b border-gray-200" {...props} />,
            th: ({ node, ...props }) => <th className="px-4 py-2" {...props} />,
            td: ({ node, ...props }) => <td className="px-4 py-2" {...props} />,
            del: ({ node, ...props }) => <del className="line-through" {...props} />,
            code: ({ node, inline, ...props }) => {
              const className = inline ? 'bg-gray-100 rounded p-1' : 'bg-gray-100 rounded p-4';
              return <code className={className} {...props} />;
            },
            hr: ({ node, ...props }) => <hr className="my-4" {...props} />,
            img: ({ src, alt, children }) => (
              <img src={src || ''} alt={alt || ''} width={400} height={400}>
                {children}
              </img>
            ),
          }}
        >
          {release.description}
        </ReactMarkdown>
      </div>
    </div>
  );
}
