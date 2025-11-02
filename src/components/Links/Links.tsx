'use client';

import { 
  Instagram
} from 'lucide-react';
import { FaTiktok, FaSnapchatGhost, FaGlobe, FaFileAlt, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import '@/styles/animations.css';

// Custom X (Twitter) Icon Component
const XIcon: React.FC = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 50 50" fill="currentColor">
    <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"/>
  </svg>
);

interface LinksMessages {
  Links: {
    title: string;
    subtitle: string;
    links: {
      website: {
        title: string;
        subtitle: string;
      };
      document2: {
        title: string;
        subtitle: string;
      };
      document4: {
        title: string;
        subtitle: string;
      };
      email: {
        title: string;
        subtitle: string;
      };
      twitter: {
        title: string;
        subtitle: string;
      };
      instagram: {
        title: string;
        subtitle: string;
      };
      snapchat: {
        title: string;
        subtitle: string;
      };
      tiktok: {
        title: string;
        subtitle: string;
      };
    };
  };
}

interface LinksProps {
  messages: LinksMessages;
}

interface LinkButtonProps {
  href: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  external?: boolean;
  delay?: number;
}

const LinkButton = ({ 
  href, 
  title, 
  subtitle, 
  icon, 
  color, 
  hoverColor, 
  external = false, 
  delay = 0 
}: LinkButtonProps) => {
  return (
    <a
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      className={`group relative w-full h-32 flex flex-col items-center justify-between gap-2 px-4 py-4 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] bg-white/10 backdrop-blur-sm border border-white/20 ${hoverColor} text-white text-center`}
    >
      <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">{icon}</span>
      <div className="flex-1 flex flex-col justify-center min-h-0 w-full">
        <div className="font-semibold text-xs sm:text-sm mb-1 leading-tight line-clamp-2">{title}</div>
        <div className="text-xs opacity-70 leading-tight line-clamp-2">{subtitle}</div>
      </div>
      {external && (
        <FaExternalLinkAlt className="text-xs opacity-50 group-hover:opacity-100 transition-opacity duration-200 absolute top-2 right-2" />
      )}
    </a>
  );
};

export default function Links({ messages }: LinksProps) {
  const links = [
    {
      id: 'website',
      title: messages.Links.links.website.title,
      subtitle: messages.Links.links.website.subtitle,
      icon: <FaGlobe />,
      href: '/',
      color: 'from-green-950 to-green-900',
      hoverColor: 'hover:bg-green-500/20'
    },
    {
      id: 'document2',
      title: messages.Links.links.document2.title,
      subtitle: messages.Links.links.document2.subtitle,
      icon: <FaFileAlt />,
      href: 'https://drive.google.com/file/d/1XFTTO_BwqEWdK-Yqrw8u93p30y0mDxi4/view?usp=sharing',
      color: 'from-green-900 to-green-950',
      hoverColor: 'hover:bg-green-500/20',
      external: true
    },
    {
      id: 'document4',
      title: messages.Links.links.document4.title,
      subtitle: messages.Links.links.document4.subtitle,
      icon: <FaFileAlt />,
      href: 'https://drive.google.com/file/d/1Y3iT0gkGrv3Vd9odDHeB7TsiBqxj2I_E/view?usp=sharing',
      color: 'from-green-900 to-green-950',
      hoverColor: 'hover:bg-green-500/20',
      external: true
    },
    {
      id: 'email',
      title: messages.Links.links.email.title,
      subtitle: messages.Links.links.email.subtitle,
      icon: <FaEnvelope />,
      href: 'mailto:info@bjeek.sa',
      color: 'from-green-950 to-green-900',
      hoverColor: 'hover:bg-green-500/20',
      external: true
    },
    {
      id: 'twitter',
      title: messages.Links.links.twitter.title,
      subtitle: messages.Links.links.twitter.subtitle,
      icon: <XIcon />,
      href: 'https://x.com/bjeeksa',
      color: 'from-green-900 to-green-800',
      hoverColor: 'hover:bg-green-500/20',
      external: true
    },
    {
      id: 'instagram',
      title: messages.Links.links.instagram.title,
      subtitle: messages.Links.links.instagram.subtitle,
      icon: <Instagram />,
      href: 'https://www.instagram.com/bjeeksa/',
      color: 'from-green-800 to-green-700',
      hoverColor: 'hover:bg-green-500/20',
      external: true
    },
    {
      id: 'snapchat',
      title: messages.Links.links.snapchat.title,
      subtitle: messages.Links.links.snapchat.subtitle,
      icon: <FaSnapchatGhost />,
      href: 'https://www.snapchat.com/add/bjeeksa',
      color: 'from-green-700 to-green-700',
      hoverColor: 'hover:bg-green-500/20',
      external: true
    },
    {
      id: 'tiktok',
      title: messages.Links.links.tiktok.title,
      subtitle: messages.Links.links.tiktok.subtitle,
      icon: <FaTiktok />,
      href: 'https://www.tiktok.com/@bjeeksa',
      color: 'from-green-700 to-green-800',
      hoverColor: 'hover:bg-green-500/20',
      external: true
    }
  ];

  return (
    <div 
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: 'url(/bg_1.png)'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 bg-black/90 -z-10" />

      {/* Content */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-sm mx-auto md:max-w-4xl lg:max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up delay-300 hardware-accelerate">
            {/* Subtitle */}
            <p className="text-gray-200 text-lg md:text-xl font-bold max-w-sm mx-auto leading-relaxed animate-fade-in-up delay-450 hardware-accelerate">
              {messages.Links.subtitle}
            </p>

            {/* Decorative line */}
            <div className="w-16 h-0.5 bg-[#00B14F] mx-auto mt-4 rounded-full animate-scale-x delay-600 hardware-accelerate" />
          </div>

          {/* Links Container */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {links.map((link, index) => (
              <div
                key={link.id}
                className="animate-fade-in-up hardware-accelerate"
                style={{ animationDelay: `${750 + index * 50}ms` }}
              >
                <LinkButton
                  href={link.href}
                  title={link.title}
                  subtitle={link.subtitle}
                  icon={link.icon}
                  color={link.color}
                  hoverColor={link.hoverColor}
                  external={link.external}
                  delay={0.1 + (index * 0.05)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
