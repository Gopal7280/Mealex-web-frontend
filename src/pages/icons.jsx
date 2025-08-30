import { User, MessageCircle, Utensils, Coins, CreditCard, Bookmark, Package, Info } from "lucide-react";

const getNotificationStyle = (type) => {
  switch (type) {
    case "account":
      return { icon: <User className="text-blue-600 w-6 h-6" />, color: "text-blue-700" };
    case "communication":
      return { icon: <MessageCircle className="text-purple-600 w-6 h-6" />, color: "text-purple-700" };
    case "mess":
      return { icon: <Utensils className="text-green-600 w-6 h-6" />, color: "text-green-700" };
    case "tokens":
      return { icon: <Coins className="text-yellow-600 w-6 h-6" />, color: "text-yellow-700" };
    case "payments":
      return { icon: <CreditCard className="text-red-600 w-6 h-6" />, color: "text-red-700" };
    case "subscription":
      return { icon: <Bookmark className="text-indigo-600 w-6 h-6" />, color: "text-indigo-700" };
    case "order":
      return { icon: <Package className="text-orange-600 w-6 h-6" />, color: "text-orange-700" };
    default:
      return { icon: <Info className="text-gray-500 w-6 h-6" />, color: "text-gray-700" };
  }
};
export default getNotificationStyle;