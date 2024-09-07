"use client";

import { useEffect, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import StyleCard from "../card/StyleCard";
import EditModal from "../modal/Hairstyle/EditModal";
import DeleteModal from "../modal/Hairstyle/DeleteModal";
import PostModal from "../modal/Hairstyle/PostModal";
import { CIcon } from "@coreui/icons-react";
import { cibAddthis } from "@coreui/icons";
import Pagination1 from "@/components/section/Pagination1";
import Loader from "@/components/loader/Loader";

export default function UserSubscriptionInfo() {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [loading, setLoading] = useState(false);

  // Fetch styles
  async function fetchStyles() {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/hairstyles?page=${currentPage}&limit=5&search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      setStyles(data.hairstyles);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching hairstyles:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (style) => {
    setSelectedStyle(style);
  };

  const handleDelete = (style) => {
    setSelectedStyle(style);
  };

  const handleSaveStyle = async (updatedStyle) => {
    try {
      const response = await fetch(`/api/hairstyles/${updatedStyle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStyle),
      });

      const data = await response.json();
      setStyles(styles.map((c) => (c.id === data.id ? data : c)));
    } catch (error) {
      console.error("Error updating style:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(`/api/hairstyles/${selectedStyle.id}`, {
        method: "DELETE",
      });
      setStyles(styles.filter((c) => c.id !== selectedStyle.id));
    } catch (error) {
      console.error("Error deleting style:", error);
    }
  };

  const handlePostSave = async (newStyle) => {
    try {
      const response = await fetch("/api/hairstyles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStyle),
      });
      if (!response.ok) {
        throw new Error("Failed to create hairstyle");
      }
      const data = await response.json();
      setStyles([...styles, data]);
      fetchStyles();
    } catch (error) {
      console.error("Error posting hairstyle:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchStyles();
  }, [currentPage, searchQuery, totalPages]);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area items-center justify-between p-4 bg-white shadow-md rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex justify-between w-52 h-12 items-center">
                  <h2 className="text-xl font-semibold">Users</h2>

                  {/* <button
                    data-bs-toggle="modal"
                    data-bs-target="#ethnicityPostModal"
                    className="bg-blue-300 text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors "
                  >
                    +
                  </button> */}

                  <CIcon
                    icon={cibAddthis}
                    size="sm"
                    data-bs-toggle="modal"
                    data-bs-target="#hairstylePostModal"
                    className=" text-black px-14 rounded-lg transition-colors hover:cursor-pointer hover:px-12"
                  />
                </div>
                <div className="row flex items-center">
                  <div className="col-lg-12">
                    <input
                      type="text"
                      placeholder="Search Users"
                      className="form-input px-4 py-2 border rounded-lg w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Image</th> {/* New Column */}
                      <th scope="col">Hair Style</th> {/* New Column */}
                      <th scope="col">Prompt</th>
                      <th scope="col" className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <Loader />
                        </td>
                      </tr>
                    ) : (
                      styles?.map((item, i) => (
                        <StyleCard
                          key={i}
                          data={item}
                          onEdit={() => handleEdit(item)}
                          onDelete={() => handleDelete(item)}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {totalPages > 1 && (
          <Pagination1
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <EditModal style={selectedStyle} onSave={handleSaveStyle} />
      <DeleteModal onConfirm={handleDeleteConfirm} />
      <PostModal onSave={handlePostSave} />
    </>
  );
}
