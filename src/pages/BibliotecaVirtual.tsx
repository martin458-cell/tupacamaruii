import { useState } from 'react';
import { Search } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { locales } from '@/lib/translations';
import { BOOKS_DATA } from '@/lib/data';

const CATEGORIES = ['Todos', 'Cuentos', 'Ciencia', 'Historia', 'Valores'];

const BibliotecaVirtual = () => {
  const { lang } = useLang();
  const t = locales[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Todos');

  const filteredBooks = BOOKS_DATA.filter(book =>
    (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (category === 'Todos' || book.category === category)
  );

  const getCategoryLabel = (cat: string) => {
    const key = cat.toLowerCase() as keyof typeof t.library;
    return t.library[key] || cat;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-3">{t.library.welcome}</h1>
          <p className="text-lg text-muted-foreground">{t.library.subtitle}</p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder={t.library.searchPlace}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none shadow-sm text-base"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md ${
                category === cat
                  ? 'bg-primary text-primary-foreground scale-105'
                  : 'bg-card text-primary border border-border hover:bg-primary/5'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-card rounded-3xl overflow-hidden shadow-md border border-border hover:shadow-xl hover:-translate-y-2 transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                    {getCategoryLabel(book.category)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-lg text-foreground mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{book.author}</p>
                  <p className="text-xs text-muted-foreground mb-4">{book.desc}</p>
                  <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-sm hover:shadow-md transition-all">
                    {t.library.readBtn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-muted-foreground">{t.library.noResults}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BibliotecaVirtual;
