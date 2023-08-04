import { CourseCard } from '@/components/courses/course-card'
import { getFeaturedCourses } from '@/server/db/courses/getters'

export async function CoursesGrid() {
  const courses = await getFeaturedCourses()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  )
}
