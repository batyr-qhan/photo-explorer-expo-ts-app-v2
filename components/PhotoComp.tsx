import { Link } from "expo-router";
import { Image, Pressable } from "react-native";

type PhotoProps = {
  id: number;
  // width: number;
  // height: number;
  urls: {
    full: string;
    large: string;
    regular: string;
    raw: string;
    small: string;
  };
  // color: string | null;
  user?: {
    username: string;
    name: string;
  };
  description: string;
};

const PhotoComp: React.FC<PhotoProps> = ({ id, urls, user, description }) => {
  //   const navigation = useNavigation<NavigationProps["navigation"]>();
  console.log("this is url ", urls.full);
  return (
    <Link
      href={{
        pathname: "/modal",
        params: {
          id: id,
          url: encodeURIComponent(urls?.full),
          author: user?.username,
          description: description,
        },
      }}
      asChild
    >
      <Pressable
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: 8,
          marginHorizontal: 8,
          height: 100,
          width: 100,
        }}
      >
        <Image
          style={{
            resizeMode: "cover",
            height: "100%",
            width: "100%",
            borderRadius: 8,
          }}
          source={{ uri: urls.full }}
        />
      </Pressable>
    </Link>
  );
};

export default PhotoComp;
