import React from 'react';
import { mockArticles } from '@/data/mock-articles';
import ArticleCard from '@/components/article-card';

interface TagPageProps {
  params: {
    tag: string;
  };
}

const TagPage: React.FC<TagPageProps> = ({ params }) => {
  const { tag } = params;

  const filteredArticles = mockArticles.filter(article =>
    article.tags && Array.isArray(article.tags) && article.tags.includes(tag)
  );

  return (
    <div>
      <h1>Articles tagged with {tag}</h1>
      {filteredArticles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default TagPage;