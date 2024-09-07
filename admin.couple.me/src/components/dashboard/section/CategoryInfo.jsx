"use client";

import { useEffect, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import HaircolorCard from "../card/HaircolorCard";
import EditModal from "../modal/Category/EditModal";
import DeleteModal from "../modal/Category/DeleteModal";
import PostModal from "../modal/Category/PostModal";
import { CIcon } from "@coreui/icons-react";
import { cibAddthis } from "@coreui/icons";
import CategoryCard from "../card/CategoryCard";
import Pagination1 from "@/components/section/Pagination1";
import Loader from "@/components/loader/Loader";

export default function CategoryInfo() {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/categories?page=${currentPage}&limit=10&search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      setStyles(data.categories);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching haircolors:", error);
    } finally {
      setLoading(false); // End loading
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
      const response = await fetch(`/api/categories/${updatedStyle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStyle),
      });

      const data = await response.json();
      setStyles(styles.map((c) => (c.id === data.id ? data : c)));
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(`/api/categories/${selectedStyle.id}`, {
        method: "DELETE",
      });
      setStyles(styles.filter((c) => c.id !== selectedStyle.id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handlePostSave = async (newStyle) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStyle),
      });
      if (!response.ok) {
        throw new Error("Failed to create category");
      }
      const data = await response.json();
      setStyles([...styles, data]);
      fetchCategories();
    } catch (error) {
      console.error("Error posting category:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchCategories();
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
                  <h2 className="text-xl font-semibold">Categories</h2>
                  <CIcon
                    icon={cibAddthis}
                    size="sm"
                    data-bs-toggle="modal"
                    data-bs-target="#hairstylePostModal"
                    className=" text-black px-9 py-2 rounded-lg transition-colors hover:cursor-pointer hover:px-8"
                  />
                </div>
                <div className="row flex items-center">
                  <div className="col-lg-12">
                    <input
                      type="text"
                      placeholder="Search Category"
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
  <div className="col-xl-12 flex justify-between w-full">
    <div className="ps-widget bgc-white bdrs4 p20 mb30 overflow-hidden position-relative w-full justify-between flex">
      <div className="packages_table table-responsive w-full justify-between flex">
        <table className="table-style3 table at-savesearch ">
          <thead className="t-head">
            <tr>
              <th scope="col" className="text-left">Category Name</th>
              <th scope="col" className="text-right">Action</th> {/* Aligns header to the right */}
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
                <CategoryCard
                  key={i}
                  data={item}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item)}
                  className="text-right"  // Aligns action buttons to the right
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
