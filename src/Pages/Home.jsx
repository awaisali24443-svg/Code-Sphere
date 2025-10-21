import Hero from '../components/Hero';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background}`}>
      <Hero />
    </div>
  );
};

export default Home;