"use client";

import { useEffect, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import BodytypeCard from "../card/BodytypeCard";
import EditModal from "../modal/Bodytype/EditModal";
import DeleteModal from "../modal/Bodytype/DeleteModal";
import PostModal from "../modal/Bodytype/PostModal";
import { CIcon } from "@coreui/icons-react";
import { cibAddthis } from "@coreui/icons";
import Pagination1 from "@/components/section/Pagination1";
import Loader from "@/components/loader/Loader";

export default function BodytypeInfo() {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [loading, setLoading] = useState(false);

  async function fetchStyles() {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/bodytypes?page=${currentPage}&limit=5&search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      setStyles(data.bodytypes);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching bodytypes:", error);
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
      const response = await fetch(`/api/bodytypes/${updatedStyle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStyle),
      });

      const data = await response.json();
      setStyles(styles.map((c) => (c.id === data.id ? data : c)));
    } catch (error) {
      console.error("Error updating bodytype:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(`/api/bodytypes/${selectedStyle.id}`, {
        method: "DELETE",
      });
      setStyles(styles.filter((c) => c.id !== selectedStyle.id));
    } catch (error) {
      console.error("Error deleting bodytype:", error);
    }
  };

  const handlePostSave = async (newStyle) => {
    try {
      const response = await fetch("/api/bodytypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStyle),
      });
      if (!response.ok) {
        throw new Error("Failed to create bodytype");
      }
      const data = await response.json();
      setStyles([...styles, data]);
      fetchStyles();
    } catch (error) {
      console.error("Error posting bodytype:", error);
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
                  <h2 className="text-xl font-semibold" style={{width: "50rem"}}>Body Types</h2>

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
                    data-bs-target="#bodytypePostModal"
                    className=" text-black px-6 py-2 rounded-lg transition-colors hover:cursor-pointer hover:px-5"
                  />
                </div>
                <div className="row flex items-center">
                  <div className="col-lg-12">
                    <input
                      type="text"
                      placeholder="Search Bodytypes"
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
                      <th scope="col">Bodytype</th> {/* New Column */}
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
                        <BodytypeCard
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
