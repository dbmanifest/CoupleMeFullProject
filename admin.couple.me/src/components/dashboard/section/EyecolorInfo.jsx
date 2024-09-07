"use client";

import { useEffect, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import StyleCard from "../card/StyleCard";
import EyecolorModal from "../modal/Eyecolor/EditModal";
import EyecolorDeleteModal from "../modal/Eyecolor/DeleteModal";
import EyecolorPostModal from "../modal/Eyecolor/PostModal";
import { CIcon } from "@coreui/icons-react";
import { cibAddthis } from "@coreui/icons";
import Pagination1 from "@/components/section/Pagination1";
import Loader from "@/components/loader/Loader";

export default function EyecolorInfo() {
  const [eyecolors, setEyecolors] = useState([]);
  const [selectedEyecolor, setSelectedEyecolor] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchEyecolors() {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/eyecolors?page=${currentPage}&limit=5&search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      setEyecolors(data.eyecolors);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching eyecolors:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (eyecolor) => {
    setSelectedEyecolor(eyecolor);
  };

  const handleDelete = (eyecolor) => {
    setSelectedEyecolor(eyecolor);
  };

  const handleSaveEyecolor = async (updatedEyecolor) => {
    try {
      const response = await fetch(`/api/eyecolors/${updatedEyecolor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEyecolor),
      });

      const data = await response.json();
      setEyecolors(eyecolors.map((c) => (c.id === data.id ? data : c)));
    } catch (error) {
      console.error("Error updating eyecolor:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(`/api/eyecolors/${selectedEyecolor.id}`, {
        method: "DELETE",
      });
      setEyecolors(eyecolors.filter((c) => c.id !== selectedEyecolor.id));
    } catch (error) {
      console.error("Error deleting eyecolor:", error);
    }
  };

  const handlePostSave = async (newEyecolor) => {
    try {
      const response = await fetch("/api/eyecolors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEyecolor),
      });
      if (!response.ok) {
        throw new Error("Failed to create eyecolor");
      }
      const data = await response.json();
      setEyecolors([...eyecolors, data]);
      fetchEyecolors();
    } catch (error) {
      console.error("Error posting eyecolor:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchEyecolors();
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

                  <h2 className="text-xl font-semibold flex-col " style={{width: "33rem"}}>Eye Colors</h2>

                  <CIcon
                    icon={cibAddthis}
                    size="sm"
                    data-bs-toggle="modal"
                    data-bs-target="#eyecolorPostModal"
                    className=" text-black px-9 py-2 rounded-lg transition-colors hover:cursor-pointer hover:px-8"
                  />
                </div>
                <div className="row flex items-center">
                  <div className="col-lg-12">
                    <input
                      type="text"
                      placeholder="Search Eyecolors"
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
                      <th scope="col">Eye Color</th> {/* New Column */}
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
                      eyecolors?.map((item, i) => (
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
      <EyecolorModal eyecolor={selectedEyecolor} onSave={handleSaveEyecolor} />
      <EyecolorDeleteModal onConfirm={handleDeleteConfirm} />
      <EyecolorPostModal onSave={handlePostSave} />
    </>
  );
}
