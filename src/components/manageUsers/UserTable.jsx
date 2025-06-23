import UserRow from "./UserRow";

export default function UserTable({ users, loading, onStatusClick }) {
  return (
    <div className="overflow-auto bg-white rounded shadow mt-10">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">
                User
              </th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">
                Name
              </th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">
                Email
              </th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">
                Phone
              </th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">
                Status
              </th>
              <th className="py-3 px-4 text-center font-semibold text-primary">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <tr key={i} className="border-b animate-pulse">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-300 rounded w-10 mx-auto"></div>
                    </td>
                  </tr>
                ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <UserRow
                  key={user._id}
                  user={user}
                  onStatusClick={onStatusClick}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
