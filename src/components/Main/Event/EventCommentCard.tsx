const EventRecommendCard = ({
  index,
  comment,
}: {
  index: number;
  comment: string;
}) => {
  return (
    <div key={index} className="font-bold text-lg">
      {comment}
    </div>
  );
};

export default EventRecommendCard;
