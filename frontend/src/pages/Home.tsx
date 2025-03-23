
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-lg font-bold text-blue-600">SC</h1>
        <div className="flex space-x-6 text-gray-600">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Connections</a>
          <a href="#" className="hover:text-blue-600">Messages</a>
          <a href="#" className="hover:text-blue-600">Response</a>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
          💬 Live Chat
        </button>
      </nav>
      
      {/* Main Content */}
      <div className="flex p-8">
        {/* Profile Section */}
        <div className="w-1/4 bg-white p-6 rounded-xl shadow-md">
          <img
            src="/profile-pic.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
          />
          <h2 className="text-center mt-4 text-xl font-semibold">Sarah Connor</h2>
          <p className="text-center text-gray-500">UX Designer & Developer</p>
          <p className="text-center mt-2 text-gray-600">📍 San Francisco, CA</p>
          <p className="text-center text-gray-600">🎓 Stanford University</p>
          <div className="flex justify-center mt-4 space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Posts</button>
            <button className="border px-4 py-2 rounded-lg">Comments</button>
          </div>
        </div>

        {/* Feed Section */}
        <div className="w-3/4 px-6">
          <div className="bg-white p-4 rounded-xl shadow-md mb-4">
            <textarea
              className="w-full p-2 border rounded-lg"
              placeholder="What's on your mind?"
            ></textarea>
            <div className="flex justify-between mt-2">
              <div>
                <button className="text-gray-500">📷 Photo</button>
                <button className="ml-4 text-gray-500">🎥 Video</button>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Post</button>
            </div>
          </div>

          {/* Post */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex items-center space-x-4">
              <img
                src="/user-avatar.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-md font-semibold">John Doe</h3>
                <p className="text-gray-500 text-sm">2 hours ago</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">
              Just finished working on an exciting new project! Can't wait to share more details soon.
            </p>
            <div className="flex justify-between mt-4 text-gray-500 text-sm">
              <button>👍 Like</button>
              <button>💬 Comment</button>
              <button>🔗 Share</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm mt-8">
        © 2025 SC. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
