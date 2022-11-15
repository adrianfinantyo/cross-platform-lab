export type tabNavProps = {
  tabItem: tabItemTypes[];
  children: React.ReactNode;
};

export type tabItemTypes = {
  tabIcon: string;
  tabLabel: string;
  href: string;
  tabBadge?: number;
};

export type mailResApi = {
  from: string;
  to: string;
  subject: string;
  message: string;
  date: string;
};

export type contactResApi = {
  name: string;
  email: string;
  avatar: string;
};

export type Memory = {
  photo: string;
  id: string;
  imagePath: string;
  title: string;
  type: "good" | "bad";
  base64Url?: string;
  position: google.maps.LatLngLiteral;
};
