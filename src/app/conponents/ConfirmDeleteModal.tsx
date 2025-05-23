const ConfirmDeleteModal: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-lg w-80 text-center pt-6 px-0">
        {" "}
        <div className="px-6">
          {" "}
          <h2
            className="text-xl font-bold mb-2"
            style={{ transform: "translateY(5px)" }}
          >
            レシピを削除しますか？
          </h2>
          <p
            className="text-sm text-gray-600 mb-8"
            style={{ transform: "translateY(15px)" }}
          >
            この操作は元に戻せません
          </p>
        </div>
        <hr className="border-t border-gray-200 w-full" />
        <div className="flex divide-x">
          <button className="w-1/2 py-4 font-bold text-black hover:bg-gray-100 rounded-bl-2xl">
            キャンセル
          </button>
          <button className="w-1/2 py-4 font-bold text-orange-500 hover:bg-orange-50 rounded-br-2xl">
            削除する
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
